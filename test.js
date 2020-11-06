
const spawn = require( 'child_process' ).spawnSync
vbs = spawn( 'cscript.exe', [ './GetRecycleBinSize.vbs' ] )
console.log( `stderr: ${vbs.stderr.toString()}` )
console.log( `stdout: ${vbs.stdout.toString()}` )
console.log( `status: ${vbs.status}` )

// Parse stdout for '<integer> KB'
let sizeKB
try {
    const stdout = vbs.stdout.toString()
    sizeKB = stdout.match( /([0-9].*)\s?KB/ )[1]
} catch ( e ) {
    console.error( e.message )
    sizeKB = 0
}

console.log(`Recycle bin size: ${ sizeKB } KB`)
