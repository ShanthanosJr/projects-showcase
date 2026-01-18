export interface GithubStats {
    followers: number;
    publicRepos: number;
    lastPush: string | null;
    avatarUrl: string;
    createdAt: string;
}

export const fetchGithubStats = async (username: string): Promise<GithubStats | null> => {
    try {
        const [userRes, eventsRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/events/public`)
        ]);

        if (!userRes.ok || !eventsRes.ok) return null;

        const userData = await userRes.json();
        const eventsData = await eventsRes.json();

        const pushEvents = eventsData.filter((e: any) => e.type === 'PushEvent');
        const lastPush = pushEvents.length > 0 ? pushEvents[0].created_at : null;

        return {
            followers: userData.followers,
            publicRepos: userData.public_repos,
            lastPush: lastPush,
            avatarUrl: userData.avatar_url,
            createdAt: userData.created_at
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
    }
};
