import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

export default async function screenshot(element, filename = undefined, clipboard = false) {
    var blob = await domtoimage.toBlob(element);

    return clipboard ? copyToClipboard(blob) : saveFile(blob, filename || timestamp())
}

async function copyToClipboard(blob) {
    await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
    ])

    alert('Copied to Clipboard');
}

function saveFile(blob, filename) {
    FileSaver.saveAs(blob, `${filename}.png`, { type: 'image/png' });
}

function timestamp() {
    return + new Date();
}

export function available() {
    return {
        clipboard: window.ClipboardItem && window.navigator
            && window.navigator.clipboard
            && window.navigator.clipboard.write,
        save: window.Blob !== undefined
    }
}
