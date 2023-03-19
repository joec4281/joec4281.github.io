#

 TechNotes - UDF Library
April 1991<br>
Page 16

### Decisions, Decisions

It would be useful to have a means of a pick-list capability in coding routines where you expect the user to build a dBASE expression, similar to the way dBASE IV does when you are building an index expression from the Control Center.

PickList() is a UDF that displays either the field names of the current database or the files of a certain extension in the current directory. After selecting from the popup, it then stuffs the selected choice into the active field or input area using the KEYBOARD command. The syntax of this UDF is as follows:

`PickList("<[STRUCTURE]>/<.<file extension>")`

As you can see, the UDF accepts one of two character string parameters. The string is either the word "STRUCTURE" (or the first four letters) in upper or lower case or an extension preceded by a period (such as .DBF, .PRG, or .BAK).

IF "STRUCTURE" is passed as the parameter, the fields for the currently active database are displayed in a popup. If no database is open at the time the UDF is called, a picklist of available .DBF files is first displayed. The file selected from the picklist is then opened in the current work area.

If a files list is needed, a file extension is entered. By beginning with a period, the logic of the UDF will construct a files list with the passed extension from qualifying files in the current directory. Entering a three letter extension without a preceding period returns a logical .F. as does anything other than the word (or partial) STRUCTURE.

As an example, consider the code segment below wherein the expression building Shift-F1 key, found in other design surfaces of dBASE IV is emulated to perform the same task in your own program.

```
ON KEY LABEL Shift-F1 ?? PickList()

Exp = SPACE(50)
@ 5,5 SAY "Enter dBASE expression:" GET Exp
READ
```

This UDF is a great foundation for you to become more creative. Perhaps you could include an array of logical operators such as +,-,*,<,>,#,.AND.,.OR.,.NOT. or $.

```
Function PickList
  PARAMETER likefile
  *-- Preserve screen
  SET CONSOLE OFF
  b4talk = SET("TALK")
  SET TALK OFF
  SAVE SCREEN TO B4pop
  
  *-- Assign "files", "fields" or "structure" macro substitution
  DO CASE
```
