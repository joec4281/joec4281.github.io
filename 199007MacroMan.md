<title>Macro Man!</title>

# TechNotes
July 1990<br>
Page 20

# Macro Man!
Adam L. Menkes

We have all, at one time or another, made changes to the structure of a database, only to find out later that the GET statements incorporated by our format files or programs are not working properly because either the lengths have changed or the field names have changed or both. You may have feared that there is no way around this; that you're stuck with going through all your code changing each memory variable in every program. "This", you mutter to yourself, "is the price I pay for power". You're tired of repetitive coding that results in hours of debugging just because some items were not consistently spelled correctly or data types mismatched.

In the listing which starts on page 23, you'll find a set of procedures and functions strategically designed to simplify many of your future coding needs. You will be able to declare all your database memory variable fields public, set field memory variables to blanks or zero, and replace contents of your fields with memory variables that were changed while in full-screen edit mode.

### & What Have We Here?

These procedures make use of the ampersand "&" for macro substitution or what is more and more being referred to as indirection. This is to distinguish the use of the & from keyboard macros now availalbe in dBASE IV. The & is also different than the double-ampersand && which allows for comments on the same line as a dBASE command. For those not familiar with macro substitution/indirection, below is an example of how it works in a program:

```foxpro
*---   Initialize memory variables mtest, mvar1, mvar2, mvar3, mvar4,
*      mvar5, mvar6, mvar7
mtest=1234      && Stores the number 1234 to variable 'mtest'.
mvar1="mtest"   && Stores the string 'mtest' to variable 'mvar1'.
mvar2=mvar1     && Result is "mtest" (Character).
mvar3=mtest     && Result is 1234 (Numeric).

*--- Results of storing these memory variables to others using
*    macro substitution.
mvar4=&mtest    && Result is SYNTAX ERROR since there is no
                   variable 1234 defined.

mvar5=&mvar1    && Result is 1234 (Numeric) since it sets mvar5
*                   equal to the contents of variable mtest.

mvar6="&mtest"  && Resul t is the string "&mtest".
mvar7="&mvar1"  && Result is the string "mtest".
```

### Using the Procedures

MacroMan.prg is an interdependent set of procedures and functions that performs a variety of tasks to allow shorter and more accurate code with less potential for error. The procedures and functions called by other procedures are denoted with ** in the in-line comment (&&) area. These are optional and can be removed from the code and replaced with explicitly named files and/or variables when these procedures need to be used independently (except where otherwise noted).

### SetaPub and SetaMem

Procedures SetaPub and SetaMem require a database with one field called Dbf, which should be defined as a character field with a length of eight bytes. This field will contain the names of all the databases that will be used in these procedures, somewhat like a catalog. These procedures could also be modified to take advantage of the existing catalog if you so choose. Both of these procedures require the use of a secondary procedure which use only one database.

The procedure SetaPub is not necessary if each database is passed as a parameter to Procedure Set1pub as follows:

```foxpro
DO Set1Pub WITH "Database1"
DO Set1Pub WITH "Database2"
DO SEt1Pub WITH "Database3"
.             .
.             .
DO Set1Pub WITH "Databasen"
```

The preferred method is to have a database, MainDbf for example, with one field with the characteristics described previously. Each record would be the name of a different database.

```
Record 1    Database1
Record 2    Database2
Record 3    Database3
.           .
.           .
Record n    Databasen
```

This would require only one statement:

`DO SetaPub WITH "Maindbf"`

For the purposes of this article, it is important that all database files should be in the current directory. These procedures have not been tested for databases in other directories which could be specified by a path. If your files are in another directory, make sure the dBASE IV directory is in your DOS path and that you change to the desired directory before starting dBASE IV. Additionally, field names in the database should not use more than nine characters, as *m* will be added as a prefix to these field names to create matching memory variables. These memory variables may not behanve properly beyond ten characters.

The accompanying procedure, Set1Pub, checks each field for a field name. Since a database can not contain a field length of 0, this procedure checks each field using the FIELD() function from FIELD(1) to FIELD(*n*) until FIELD(*n*) returns a null.

The procedures SetaMem and Set1Mem are best used in conjunction with SetaPub or Set1Pub, as they do not check to see if a memory variable has already been declared, but assume it exists and is either public or private.

### InUse(\<expC>\)

This function checks all ten work areas to see if the database passed as a parameter is in use in any of these areas. If it is, the value returned is the number of the work area where the file is in use, otherwise, 0 is returned. For example:

```foxpro
. SELECT SELECT()    && Select next highest open work area
. USE Client
. SELECT SELECT()
. USE SAMPLE
. SELECT SELECT()
. USE Checks
. ? Inuse("Sample")
9
```

### FullDBF (\<expC>\)

This function checks for a file extension, and if one does not exist, assumes a ".dbf" extension. For example:

```foxpro
. Test1 = FullDbf("Client")
CLIENT.DBF
. Test2 = FullDbf("Sample.dbf")
SAMPLE.DBF
. Test3 = FullDbf("Info.txt")
INFO.TXT
```

There are those times when you want to branch to a procedure that switches to an alternate work area. By calling your procedure as a parameter with this procedure, you are returned to the work area from which you began.

### Exceptions With Memo Fields

Although you can not create a memory variable for a memo field, you can create a memory variable that references a text file of that name, creating a pseudo memory variable. This type of fuctionality is not included in this article as thorough testing has not been done. However, the concept is worth mentioning. As we are able to store all other data to memory variables and then, save or reject the entries we have made, it would be helpful if the same option were available for memo fields.

For example, in a network, it is not desirable to retain a record in a locked mode while changes were being made (as it could be locked for a while), nor would you want the changes made to the file if the user decided that the information added or changed in the memo field was incorrect. In order to add the capability, remove the following clause in the procedure entitled Set1Pub.

```foxpro
IF mFld_Type <> "M"
  PUBLIC m&mFld_Name    && Declares memory varaible
      *                    'm' + the field name PUBLIC.
ENDIF
```

and in procedure Set1Mem, add the following to the DO CASE clause:

```foxpro
CASE mFld_Type = "M"
  SET ALTERNATE TO m&mFld_Type..VMO [ADDITIVE]
  *--- Note the two periods. One denotes the end of the
  *    macro, the second is for the file extension VMO
  *    (Variable MEMO).
  SET ALTERNATE TO
```

You may want to check first to see if InUse(m&mFld_Type..VMO), and either overwrite it or add to it with the ADDITIVE option. Remember to use SET SAFETY OFF so that you won't be continually prompted to overwrite the file. You may also want to COPY MEMO TO m&mFld_Name [ADDITIVE] fromm within the program if a SEEK is performed.

Once changes were made from within the program: (using MODI COMM &mFld_Name, for example), you could not REPLACE Fld_Name WITH mFld_Name, since this field is a memo data type (as accounted for in the case statement above checking for mFld_Type="m") but you could APPEND MEMO FROM &mFld_Name [OVERWRITE]. This could be easily added to the ReplVar procedure as the ELSE condition for IF mFld_Type <> "M".

Now that this article has got you started, try this concept with arrays, windows, and popups? Ah, yes, the wonders of macro substitution.

### MacroMan.prg

```foxpro
PROCEDURE SetaPub
    *-- Initializes PUBLIC memory variables defined as "m" + FIELDNAME
    *    for FIELDS in a Database. This is used in conjunction with the
    *    procedure Set1Pub.
    *-- SYNTAX: DO Procedure WITH <expC>
    *-- Example: DO SetaPub WITH "Maindbf.DBF"
    
    PARAMETER AllDbf           &&    DATABASE that contains a short catalog
    *                                of DATABASEs with fields that will be
    *                                used for declaring memory variables.
    DO setArea1 WITH AllDbf    && ** Selects Area where DATABASE is in
    *                                use or opens it in an unused area.
    
    SCAN
       vDBF=DBF                &&    Variable 'vDbf' gets database name
       *                             from database passed as a Parameter.
       DO Set1Pub WITH vDbf    &&    Calls sub-procedure passing this
       *                             variable as the parameter.
       DO SelArea1 WITH Alldbf &&    Re-SELECTs Work Area of AllDbf.
    ENDSCAN
    
    DO SelArea2                && ** Closes AllDbf if it was not in USE
    *                                 before the current procedure
RETURN

```