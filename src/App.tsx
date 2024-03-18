import { useEffect, useState } from 'react';
import './App.css'

interface SteamProfile {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
}

function App() {
  const [profile, setProfile] = useState<SteamProfile | null>(null);
  const steamId = '76561198189866855'; // Replace with your Steam ID
  const apiKey = '211D237269ED9DCCDE0C0E3C4F185524'; // Replace with your Steam API key

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=211D237269ED9DCCDE0C0E3C4F185524&steamids=76561198189866855`
        );
        console.log(response)
        const data = await response.json();
        const player = data.response.players[0];
        setProfile({
          steamid: player.steamid,
          personaname: player.personaname,
          profileurl: player.profileurl,
          avatar: player.avatarfull,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [apiKey, steamId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png" className="logo react" alt="Steam logo" />
        </a>
      </div>
      <h1>Meu Perfil da Steam</h1>
      <div className="card">
      </div>
      <div>
        <h1>{profile.personaname}'s Profile</h1>
        <div>
          <img src={profile.avatar} alt="Avatar" />
          <p>Steam ID: {profile.steamid}</p>
          <p>Profile URL: <a href={profile.profileurl}>{profile.profileurl}</a></p>
        </div>
      </div>
    </>
  )
}

export default App
