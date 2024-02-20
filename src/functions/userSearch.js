export async function searchUsers(nameQuery) {
    const q = nameQuery.trim();
    const results = [];

    if (q !== '') {
        try {
            // Simulated data for testing
            const simulatedData = [
                { id: '1', username: 'user1', email: 'user1@example.com' },
                { id: '2', username: 'user2', email: 'user2@example.com' },
                { id: '3', username: 'user3', email: 'user3@example.com' },
            ];

            // Simulated search logic
            simulatedData.forEach(user => {
                if (user.username.toLowerCase().includes(q.toLowerCase())) {
                    results.push(user);
                }
            });

            return results;
        } catch (error) {
            console.error('Error searching:', error);
            return [];
        }
    } else {
        return [];
    }
}
