import React, { useState, useEffect, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, getCurrentUser, signOut } from 'aws-amplify/auth';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import awsExports from '../aws-exports';
import { createTravelEntry } from '../graphql/mutations';
import { listTravelEntries } from '../graphql/queries';

import './login.css';

Amplify.configure(awsExports);
const apiClient = generateClient(); // Required for GraphQL API in Amplify v6

const Login = () => {
    const [user, setUser] = useState(null);
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [entries, setEntries] = useState([]);
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        checkUser();
        fetchEntries();
    }, []);

    async function checkUser() {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.log("Not signed in");
        }
    }

    async function handleSignIn() {
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const { isSignedIn } = await signIn({ username: email, password });
            if (isSignedIn) {
                console.log("User signed in");
                checkUser();
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            alert("Invalid credentials or network error.");
        }
    }

    async function handleSignOut() {
        try {
            await signOut();
            setUser(null);
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    }

    async function uploadImage(file) {
        if (!file) return null;

        // Validate file type and size (max 5MB)
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert("Only JPEG and PNG images are allowed.");
            return null;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB.");
            return null;
        }

        try {
            const fileName = `uploads/${Date.now()}-${file.name}`;
            await uploadData({ key: fileName, data: file, options: { contentType: file.type } });
            const imageUrl = await getUrl({ key: fileName });
            console.log("Image uploaded:", imageUrl);
            return imageUrl;
        } catch (error) {
            console.error("Image upload error:", error);
            alert("Image upload failed.");
            return null;
        }
    }

    async function saveEntry() {
        if (!user) {
            alert("Please log in first.");
            return;
        }
        if (!place || !description) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            let imageUrl = '';
            if (file) {
                imageUrl = await uploadImage(file);
                if (!imageUrl) return; // Stop if upload failed
            }

            const entryData = {
                user: user.username,
                place,
                description,
                imageUrl
            };

            const response = await apiClient.graphql({
                query: createTravelEntry,
                variables: { input: entryData }
            });

            console.log("Entry saved in DynamoDB:", response.data.createTravelEntry);
            alert("Entry saved successfully!");

            setPlace('');
            setDescription('');
            setFile(null);

            fetchEntries(); // Refresh list after saving
        } catch (error) {
            console.error("Error saving entry:", error);
            alert("Failed to save entry. Check console for details.");
        }
    }

    async function fetchEntries() {
        try {
            const response = await apiClient.graphql({ query: listTravelEntries });
            const entries = response.data.listTravelEntries.items;
            console.log("Fetched entries from DynamoDB:", entries);
            setEntries(entries);
        } catch (error) {
            console.error("Error fetching entries:", error);
            alert("Failed to fetch entries.");
        }
    }

    return (
        <div className="login-container">
            <h1 className="title">Travel Tales</h1>
            <p className="description">Capture and cherish your travel experiences by adding a place, description, and image.</p>

            {!user ? (
                <div className="login-box">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" ref={emailRef} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <button onClick={handleSignIn}>Sign In</button>
                </div>
            ) : (
                <div className="dashboard">
                    <h2 className="welcome">Welcome, {user.username}!</h2>
                    
                    <div className="entry-form">
                        <input type="text" placeholder="Place" value={place} onChange={e => setPlace(e.target.value)} />
                        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <input type="file" accept="image/jpeg, image/png" onChange={e => setFile(e.target.files[0])} />
                        <button onClick={saveEntry}>Save Entry</button>
                    </div>

                    <h2>Previous Entries</h2>
                    <ul className="entries-list">
                        {entries.length > 0 ? (
                            entries.map(entry => (
                                <li key={entry.id}>
                                    <h3>{entry.place}</h3>
                                    <p>{entry.description}</p>
                                    {entry.imageUrl && <img src={entry.imageUrl} alt="Uploaded" width="200px" />}
                                </li>
                            ))
                        ) : (
                            <p>No entries found.</p>
                        )}
                    </ul>

                    <button className="logout-btn" onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
        </div>
    );
};

export default Login;