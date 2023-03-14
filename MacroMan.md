# TechNotes
July 1990<br>
Page 20

# Macro Man!
Adam L. Menkes

We have all, at one time or another, made changes to the structure of a database, only to find out later that the GET statements incorporated by our format files or programs are not working properly because either the lengths have changed or the field names have changed or both. You may have feared that there is no way around this; that you're stuck with going through all your code changing each memory variable in every program. "This", you mutter to yourself, "is the price I pay for power". You're tired of repetitive coding that results in hours of debugging just because some items were not consistently spelled correctly or data types mismatched.

In the listing which starts on page 23, you'll find a set of procedures and functions strategically designed to simplify many of your future coding needs. You will be able to declare all your database memory variable fields public, set field memory variables to blanks or zero, and replace contents of your fields with memory variables that were changed while in full-screen edit mode.

### & What Have We Here?

These procedures make use of the ampersand "&" for macro substitution or what is more and more being referred to as indirection. This is to distinguish the use of the & from keyboard macros now availalbe in dBASE IV. The & is also different than the double-ampersand && which allows for comments on the same line as a dBASE command. For those not familiar with macro substitution/indirection, below is an example of how it works in a program:
```
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

Procedures SetaPub and SetaMem require a database with one field called Dbf, which should be defined as a character field with a length of eight bytes. This field will contain the names of all the databases that will be used in these procedures, somewhat like a catalog.
