function parseUsers(data) {
    return data.trim().split('\n').map(line => {
        const [id, nome, papel, email] = line.split(';');
        return { id, nome, papel, email };
    });
}

module.exports = { parseUsers };