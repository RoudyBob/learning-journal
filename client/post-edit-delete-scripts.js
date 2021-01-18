// post journal
function postJournal() {
    // console.log('postJournal Function Called');
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let entry = document.getElementById('entry').value;
    const accessToken = localStorage.getItem('SessionToken');
    let newEntry = { journal: { title: title, date: date, entry: entry } };

    fetch('http://localhost:3000/journal/create', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }),
        body: JSON.stringify(newEntry)
    })
    .then (response => response.json())
    .then (response => { 
        console.log(response);
        displayMine();
    })
    .catch((err) => { console.log(err) });
}

// update journal
function editJournal(postId) {
    // console.log('editJournal Function Called');
    console.log(postId);
    const fetch_url = `http://localhost:3000/journal/update/${postId}`
    const accessToken = localStorage.getItem('SessionToken');

    let card = document.getElementById(postId);
    let input = document.createElement('input');

    if (card.childNodes.length < 2) {
        card.appendChild(input);
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'updatedEntry');
        input.setAttribute('placeholder', 'Change entry. Click Edit to save.');
    } else {
        let updated = document.getElementById('updatedEntry').value;
        let updateEntry = { journal: { entry: updated } };
        const response = fetch(fetch_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(updateEntry)
        })
            .then (response => {
                return response.json();
            })
            .then (data => {
                console.log(data);
                displayMine();
            })
        
        card.removeChild(card.lastChild);
    }
}

// delete journal
function deleteJournal(postId) {
    // console.log('deleteJournal Function Called');
    console.log('deleteJournal working');
    console.log(postId);

    const fetch_url = `http://localhost:3000/journal/delete/${postId}`;
    const accessToken = localStorage.getItem('SessionToken');

    fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            console.log(response);
            displayMine();
        })
}
