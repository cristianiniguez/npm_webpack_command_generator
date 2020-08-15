const tableBody = document.getElementById('table-body')
const resultCommand = document.getElementById('result-command')
const chbDevelopment = document.getElementById('dev-dep-chb')
const chbExact = document.getElementById('exact-chb')

chbDevelopment.addEventListener('change', generateCommand)
chbExact.addEventListener('change', generateCommand)

async function printPacks() {
    const response = await fetch('./packs.json')
    const packs = await response.json()
    tableBody.innerHTML = packs.map(pack => `
        <tr>
            <td>
                <label onchange="generateCommand()">
                    <input type="checkbox" id="pack-chb" value="${pack.name}">${pack.name}
                </label>
            </td>
            <td>${pack.description}</td>
            <td><a href="${pack.documentacion_link}" target="_blank">Oficial</a></td>
        </tr>
    `).join('')
}


function generateCommand() {
    const checkboxList = Array.from(document.querySelectorAll('#pack-chb'))
    const checkedList = checkboxList.filter(chb => chb.checked)
    let cmd = ''
    if (checkedList.length > 0) {
        const choosenPackNames = checkedList.map(chb => chb.value).join(' ')
        cmd = `npm i ${choosenPackNames}`
        if (chbDevelopment.checked) {
            cmd += ' -D'
        }
        if (chbExact.checked) {
            cmd += ' -E'
        }
    }
    resultCommand.value = cmd
}

function copyCommand() {
    resultCommand.focus()
    document.execCommand('selectAll')
    document.execCommand('copy')
}

printPacks()