if WScript.Arguments.Count < 2 then
    WScript.Echo "Missing parameters"
end if

Const DESKTOP = &H10&

Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.NameSpace(DESKTOP)
Set objFolderItem = objFolder.ParseName(WScript.Arguments(0))
Set objShortcut = objFolderItem.GetLink
objShortcut.SetIconLocation WScript.Arguments(1), 0
objShortcut.Save