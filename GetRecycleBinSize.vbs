
Const RECYCLE_BIN = &Ha&
Const FILE_SIZE = 3

Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.Namespace(RECYCLE_BIN)
Set colItems = objFolder.Items
filesCount = 0
For Each objItem in colItems
    filesCount = filesCount + 1
    strSize = objFolder.GetDetailsOf(objItem, FILE_SIZE)
    arrSize = Split(strSize, " ")
    intSize = intSize + CLng(arrSize(0))
Next
Wscript.Echo filesCount & " Items"
Wscript.Echo intSize & " KB"