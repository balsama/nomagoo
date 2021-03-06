chrome.storage.sync.get(['usernames'], function(result) {
    var elements = document.getElementsByClassName('comment');
    var userNameToHide = result.usernames;

    var magooCommentsHidden = 0;
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        var usernameElement = element.getElementsByClassName('username');
        if (usernameElement) {
            var username = usernameElement[0].innerHTML;
            if (username === userNameToHide) {
                var next = element.nextElementSibling;

                if (next) {
                    // If there is another comment, AND it's indented, it's a reply! Remove that too.
                    var indented = next.getElementsByClassName('indented')
                    if (indented) {
                        next.parentNode.removeChild(next);
                    }
                }

                element.parentNode.removeChild(element);
                magooCommentsHidden++;
            }
        }
    }
    if (magooCommentsHidden) {
        const plural = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
        console.log('Removed ' + plural(magooCommentsHidden, 'comment thread') + ' by ' + userNameToHide + '.');
    }

});
