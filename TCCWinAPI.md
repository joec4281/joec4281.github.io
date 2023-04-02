<title>Take Command Console WinAPI Functions</title>

#   Take Command Console WinAPI Functions
<a name="top"></a>
[CloseClipboard](#CloseClipboard)  
[EnumClipboardFormats](#EnumClipboardFormats)  
[FindWindowClass](#FindWindowClass)  
[FindWindowTitle](#FindWindowTitle)  
[GetCurrentProcessID](#GetCurrentProcessID)  
[GetForegroundWindow](#GetForegroundWindow)  
[GetSystemMenu](#GetSystemMenu)  
[IsWindow](#IsWindow)  
[OpenClipboard](#OpenClipboard)  
[SetEnvironmentVariable](#SetEnvironmentVariable)    
[StrFormatByteSize](#StrFormatByteSize)  



---
<a name="CloseClipboard">
</a>

## CloseClipboard

#### CloseClipboard=\`%@winapi[user32.dll,CloseClipboard,0]\`

Example:
```cmd
echo %@winapi[user32.dll,CloseClipboard,0]
1
```

If the function succeeds, the return value is non-zero.  
If the function fails, the return value is zero.

[Top Of Page](#top)

---
<a name="EnumClipboardFormats">
</a>

## EnumClipboardFormats

#### set uFormat=\`%@winapi[user32.dll,EnumClipboardFormats,%uFormat]\`

Examples:

```cmd
:clipistext
if %@winapi[user32.dll,OpenClipboard,0] LE 0 return -1
set rv=0
set uFormat=0
do until %uFormat == 0
    set uFormat=%@winapi[user32.dll,EnumClipboardFormats,%uFormat]
    if %uFormat == 1 .or. %uFormat == 7 .or. %uFormat == 13 (set rv=1 & leave)
enddo
set junk=%@winapi[user32.dll,CloseClipboard]
return %rv
```

More details on the JPSoft Forum:
[Detect Clipboard Format](https://jpsoft.com/forums/threads/detect-clipboard-format.5227/)

[Top Of Page](#top)

---
<a name=FindWindowClass>
</a>

## FindWindowClass

#### FindWindowClass=\`%@winapi[user32,FindWindow,"%$",0]\`

Examples:

```cmd
echo %@FindWindowClass[Shell_TrayWnd]
65690

echo %@FindWindowClass[Notepad]
1379358

echo %@FindWindowClass[Progman]
65818
```

[Top Of Page](#top)

---
<a name=FindWindowTitle>
</a>

## FindWindowTitle

#### FindWindowTitle=\`%@winapi[user32,FindWindow,0,"%$"]\`

Examples:
```cmd
echo %@FindWindowTitle[Untitled - Notepad]
1379358

echo %@FindWindowTitle[Admin: Take Command Console]
394834

echo %@FindWindowTitle[%_winfgwindow]
394834

echo %@findwindowtitle[%_wintitle]
394834

echo %@findwindowtitle[Start]
65938
```

[Top Of Page](#top)

---
<a name="GetCurrentProcessID">
</a>

## GetCurrentProcessID

#### GetCurrentProcessID=\`%@winapi[kernel32.dll,GetCurrentProcessId]\`

Example:
```cmd
echo %@GetCurrentProcessID[]
14640

echo %_pid
14640
```

[Top Of Page](#top)

---
<a name="GetForegroundWindow">
</a>

## GetForegroundWindow

#### GetForegroundWindow=\`%@winapi[user32.dll,GetForegroundWindow]\`

Example:
```cmd
echo %@GetForegroundWindow[]
394834
```

---
<a name="GetSystemMenu">
</a>

## GetSystemMenu

#### GetSystemMenu=\`%@winapi[user32.dll,GetSystemMenu,%1,0]\`

Examples:
```cmd
set hWnd=%@GetForegroundWindow[]
echo %hwnd
394834

echo %@GetSystemMenu[%hwnd]
198257
```

[Top Of Page](#top)

---
<a name="IsWindow">
</a>

## IsWindow

#### IsWindow=\`%@winapi[user32.dll,IsWindow,%1]\`

Example:
```cmd
set fgWnd=%@getforegroundwindow[]
echo %@IsWindow[%fgWnd]
1
```

[Top Of Page](#top)

---
<a name="OpenClipboard">
</a>

## OpenClipboard

#### OpenClipboard=\`%@winapi[user32.dll,OpenClipboard,0]\`

Example:
```cmd
echo %@winapi[user32.dll,OpenClipboard,0]
1
```

If the function succeeds, the return value is non-zero.  
If the function fails, the return value is zero.

[Top Of Page](#top)

---
<a name="SetEnvironmentVariable">
</a>

## SetEnvironmentVariable

#### SetEnvironmentVariable=\`%@winapi[kernel32.dll,SetEnvironmentVariable,%1,%2]\`

Examples:

```cmd
echo %@setenvironmentvariable["a","10"]
1

set a
10
```

[Top Of Page](#top)
  
---
<a name="StrFormatByteSize">
</a>

## StrFormatByteSize

#### StrFormatByteSize=\`%@winapi[shlwapi.dll,StrFormatByteSizeA,%1,aBUFFER,256]\`

Examples:
```cmd
echo %@StrFormatByteSize[1024]
1.00 KB

echo %@StrFormatByteSize[10240]
10.0 KB

echo %@StrFormatByteSize[102400]
100 KB

echo %@StrFormatByteSize[1024000]
0.97 MB

echo %@StrFormatByteSize[10240000]
9.76 MB
```

[Top Of Page](#top)
