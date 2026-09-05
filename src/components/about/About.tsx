import { useEffect, useState } from "react";
import UserPage from "../user-page/UserPage";
import "./About.css";
import Shimmer from "../shimmer/Shimmer";

interface GitHubUser {
    name: string;
    login: string;
    avatar_url: string;
    html_url: string;
}

const About = () => {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("https://api.github.com/users/ShubhamJha28");

                if (!res.ok) {
                    throw new Error("Unable to fetch GitHub profile");
                }

                const data: GitHubUser = await res.json();
                setUser(data);
            } catch {
                setError(true);
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <p>Unable to load the GitHub profile right now.</p>;
    }

    if (!user) return <Shimmer />;

    return (
        <div>
            <UserPage name={user.name} username={user.login} avatar_url={user.avatar_url} github_link={user.html_url} />
        </div>
    );
};

export default About;
