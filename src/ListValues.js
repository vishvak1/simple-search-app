function filterSearchQuery(props) { // Search query filter with the matching query letters highlighted
    let txt = props.list;
    let value = props.value.toLowerCase();

    let arr = [];

    for (let i of txt) {
        let Person = Object.assign({}, i);

        let key;

        if (value.length !== 0) {
            if (Number.isInteger(parseInt(props.value)) && i.id.toString().includes(value)) {
                key = 'id';
            }
            else if (i.name.toLowerCase().includes(value)) {
                key = 'name';
            } else if (i.username.toLowerCase().includes(value)) {
                key = 'username';
            } else if (i.email.toLowerCase().includes(value)) {
                key = 'email';
            }

            switch (key) {
                case 'id':
                    arr.push(Person);
                    break;
                case 'name':
                    //---Highlight functionality---
                    let name_idx = i.name.toLowerCase().indexOf(value);

                    let name_Text = [
                        i.name.substring(0, name_idx),
                        <strong className="highlighted-text" key={i.id}>{
                            i.name.substring(name_idx, name_idx + value.length)
                        }</strong>,
                        i.name.substring(name_idx + value.length)
                    ];

                    Person['name'] = name_Text;
                    //---End of Highlight functionality---
                    arr.push(Person);
                    break;
                case 'username':
                    //---Highlight functionality---
                    let username_idx = i.username.toLowerCase().indexOf(value);

                    let username_Text = [i.username.substring(0, username_idx),
                    <strong className="highlighted-text" key={i.id}>{
                        i.username.substring(username_idx, username_idx + value.length)
                    }</strong>,
                    i.username.substring(username_idx + value.length)];

                    Person['username'] = username_Text;
                    //---End of Highlight functionality---
                    arr.push(Person);
                    break;
                case 'email':
                    //---Highlight functionality---
                    let email_idx = i.email.toLowerCase().indexOf(value);

                    let email_Text = [i.email.substring(0, email_idx), <strong className="highlighted-text" key={i.id}>{i.email.substring(email_idx, email_idx + value.length)}</strong>, i.email.substring(email_idx + value.length)];

                    Person['email'] = email_Text;
                    //---End of Highlight functionality---
                    arr.push(Person);
                    break;
                default:
                    break;
            }
        } else {
            arr.push(Person);
        }
    }

    return arr;
}

const simpleFilterSearchQuery = (props) => { // Simple filter Search Query filter without higlighting the matching text in the query
    return props.list.filter(
        (item) => item.id.toString().includes(props.value)
            || item.name.toLowerCase().includes(props.value)
            || item.username.toLowerCase().includes(props.value)
            || item.email.toLowerCase().includes(props.value)
    )
}

const ListValues = (props) => {
    // let list_monsters = simpleFilterSearchQuery(props);
    let list_monsters = filterSearchQuery(props);

    return <table id="list-table" className="table table-hover table-borderless lead">
        <thead id="list-table-header" className="bg-primary">
            <tr id="list-table-header-row">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody id="table-body" className="table-group-divider">
            {
                list_monsters.map((monster) =>
                    <tr key={monster.id}>
                        <td title="Id">{monster.id}</td>
                        <td title="Name">{monster.name}</td>
                        <td title="Username">{monster.username}</td>
                        <td title="Email">{monster.email}</td>
                    </tr>
                )
            }
        </tbody>
    </table>
}

export default ListValues;