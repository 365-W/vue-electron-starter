export function cmd(command, success, failure) {
    const exec = window['exec']
    exec.cmd(command, e => {
        if (e.stdout && success) success(e.stdout)
        if (e.stderr && failure) failure(e.stderr)
    })
}
