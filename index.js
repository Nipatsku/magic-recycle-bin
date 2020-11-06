
const spawn = require( 'child_process' ).spawnSync


const SET_ICON_VBS = './SetIcon.vbs'
const TARGET_SHORTCUT = 'Magical Recycle Bin.lnk'
const LOG = true



const setActiveIcon = ( iconPath ) => {
    // Run SetIcon.vbs to change shortcut Icon.
    if ( LOG ) {
        console.log(`\t-> Set active icon: ${ iconPath }`)
    }
    vbs = spawn( 'cscript.exe', [ SET_ICON_VBS, TARGET_SHORTCUT, iconPath ] )
    if ( LOG ) {
        console.log( `stderr: ${vbs.stderr.toString()}` )
        console.log( `stdout: ${vbs.stdout.toString()}` )
        console.log( `status: ${vbs.status}` )
    }
}

const getRecycleBinSize = () => {
    vbs = spawn( 'cscript.exe', [ './GetRecycleBinSize.vbs' ] )
    if ( LOG ) {
        console.log( `stderr: ${vbs.stderr.toString()}` )
        console.log( `stdout: ${vbs.stdout.toString()}` )
        console.log( `status: ${vbs.status}` )
    }

    // Parse stdout for '<integer> KB' and '<integer> Items'
    let sizeKB = 0, items = 0
    try {
        const stdout = vbs.stdout.toString()
        items = Number( stdout.match( /([0-9].*)\s?Items/ )[1] )
        sizeKB = Number( stdout.match( /([0-9].*)\s?KB/ )[1] )
    } catch ( e ) {
        console.error( e.message )
    }
    return { sizeKB, items }
}



(async () => {

    let activeIconIndex
    const setIconByIndex = ( i ) => {
        if ( activeIconIndex !== i ) {
            const iconPath = `${__dirname}/icons/${ i }.ico`
            setActiveIcon( iconPath )
            activeIconIndex = i
        }
    }

    while ( true ) {
        if ( LOG )
            console.log(`Update recycle bin state.`)

        const { sizeKB, items } = getRecycleBinSize()
        if ( LOG )
            console.log(`\t->${sizeKB} KB`)

        // Logarithmic interpolation with bin size KB / max index + reference KB value.
        const iMax = 30
        let i = sizeKB === 0 ?
            0 :
            (iMax/8) * Math.log10( sizeKB )
        // Ceil round and clamp.
        i = Math.min( Math.ceil( i ), iMax )
        if ( LOG )
            console.log(`\t->${ i } (interpolated [0, ${ iMax }]), ${items} files`)
        // Clamp by number of files.
        i = Math.min( i, items )
        setIconByIndex( i )

        await new Promise( resolve => setTimeout( resolve, 2000 ) )
    }

})();
