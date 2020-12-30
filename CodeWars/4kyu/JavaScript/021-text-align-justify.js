// https://www.codewars.com/kata/537e18b6147aa838f600001b/
// You will be given a single-lined text and the expected justification width. The longest word will never be greater than this width.
// Here are the rules:
// - Use spaces to fill in the gaps between words.
// - Each line should contain as many words as possible.
// - Use '\n' to separate lines.
// - Gap between words can't differ by more than one space.
// - Lines should end with a word not a space.
// - '\n' is not included in the length of a line.
// - Large gaps go first, then smaller ones ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 1 spaces)).
// - Last line should not be justified, use only one space between words.
// - Last line should not contain '\n'
// - Strings with one word do not need gaps ('somelongword\n').

function justify(str, len) {
    const r = new RegExp(/ +/);
    let array = str.split(r);

    let result = [];

    while (array.length > 0) {
        let length = 0;
        let words = [];

        for (let i = 0; i < array.length; i++) {
            const word = array[i];

            if (length + word.length <= len) {
                length += word.length + 1;
                words.push(word);
            } else {
                break;
            }
        }

        // remove from array the words
        array = array.slice(words.length);

        if (array.length === 0) {
            result.push(words.join(' '));
        } else {
            // missing spaces = total - (found words 
            let totalSpaces = len - (length - words.length);
            let spaces = Math.ceil(totalSpaces / (words.length - 1));

            let line = words.reduce((line, word, index, arr) => {
                if (index < arr.length - 1) {
                    line += word + ' '.repeat(spaces);

                    totalSpaces -= spaces;
                    spaces = Math.ceil(totalSpaces / (arr.length - index - 2));
                } else {
                    line += word;
                }
                return line;
            }, '');

            result.push(line);
        }
    }

    return result.join('\n');
}

const string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.'

console.log(justify(string, 30));