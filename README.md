# Counter-Strike 2 (CS2) Modded Dedicated Server

### [Player Server Guide](https://mavproductions.github.io/cs2-modded-server/Player%20Server%20Guide/) | [Maps Available](#what-maps-are-preconfigured-with-each-mode) | [Modes Available](#changing-game-modes) | [Plugins List](#mods-installed)

## About

A single modded Counter-Strike 2 (CS2) Modded Dedicated Server that you can [change the active mod](#changing-game-modes) on the server from chat or server console. [Maps are preconfigured per game mode](#what-maps-are-preconfigured-with-each-mode) and change when the game mode changes.

Each game mode has a hand full of maps preset so you are ready to go and it's [easy to add more](#setting-maps-for-different-game-modes).

- 1v1 (with arenas) ([Steam API key](#playing-workshop-mapscollections) required)
- Aim Maps
- Armsrace
- AWP Maps
- Casual
- Deathmatch ([Steam API key](#playing-workshop-mapscollections) required)
- Competitive (using [MatchZy](https://github.com/shobhit-pathak/MatchZy#usage-commands))
- Practice (record grenade throws etc)
- GunGame
- Mini-style Maps
- Retake
- Executes
- Wingman (allows more than 4 players) ([Steam API key](#playing-workshop-mapscollections) required)
- KZ ([Steam API key](#playing-workshop-mapscollections) required)
- BHop ([Steam API key](#playing-workshop-mapscollections) required)
- Surf ([Steam API key](#playing-workshop-mapscollections) required)
- ScoutzKnivez ([Steam API key](#playing-workshop-mapscollections) required)
- Mini Games ([Steam API key](#playing-workshop-mapscollections) required)
- Course format (tests players with different traps, kz, surf, bhop) ([Steam API key](#playing-workshop-mapscollections) required)
- Prefire
- Hide n Seek ([Steam API key](#playing-workshop-mapscollections) required)
- Soccer ([Steam API key](#playing-workshop-mapscollections) required)

Every time you want to boot the server, you should run `gcp.sh` (if on Google Cloud) or `install.sh` (on Linux) and it will ensure your OS is up to date, CS2 is up to date, and pull down the latest patches from this mod (any updates that I push up).

Obviously, any changes you have made to the files in this mod will be overwritten so I have created a "[custom files](#custom-files)" folder where you mirror the contents of the `game/csgo/` folder, and any files you want to tweak, you put in there in the same spot and they will always overwrite the mods default files. Read more about it [here](#custom-files).

The simple quick setup:

1. [Create your firewall rules](#create-firewall-rule)
2. [Provision your server on Google Cloud](#create-instance)
3. [SSH into server](#ssh-to-server)
4. [Install mod](#install-mod)
5. [Create your custom files for hostname, admins etc](#custom-files)
6. Ensure you have followed the steps for creating an [online server](#creating-an-online-server) or [LAN server](#creating-a-lan-server)
7. Kill server if running `./stop.sh` and start again `gcp.sh` (if on Google Cloud) or `install.sh` (on Linux)

Your server should be up and running!

To check everything is working correctly run the following commands in the server console:

- `meta list` and you should see `CounterStrikeSharp` in the output
- `css_plugins list` and you should see a few plugins in the output

If you see content in both; everything is working.

> [!IMPORTANT]
> Using RCON whilst connected to the server does not work. See discussion [here](https://www.reddit.com/r/GlobalOffensive/comments/167spzi/cs2_rcon/).
> The current work arounds are:
>
> - I have included [CS2Rcon](https://github.com/LordFetznschaedl/CS2Rcon) which allows admins to use !rcon in chat.
> - You can disconnect from the server and use `rcon_address IP:PORT` in console and you can use rcon commands.
> - Use an external RCON program which has implemented the RCON protocol such as [this](https://github.com/fpaezf/CS2-RCON-Tool-V2).

Useful things to know:

- [Access admin menu](#acessing-admin-menu)
- [Changing game mode](#changing-game-modes)
- [Changing maps](#changing-maps)
- [Player commands](#player-commands)

Getting up and running:

- [Running on Google Cloud](#running-on-google-cloud)
- [Running on Linux](#running-on-linux)
- [Running in Docker](#running-in-docker)
- [Running on Windows](#running-on-windows)

## Mods installed

Mod | Version | Developer | Why
--- | --- | --- | ---
[Metamod:Source](http://www.sourcemm.net/downloads.php?branch=master) | `2.0.0-1293` | Community-Project | Sits between the Game and the Engine, and allows plugins to intercept calls that flow between
[CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) | `242` | [roflmuffin](https://github.com/roflmuffin/) | Attempts to implement a .NET Core scripting layer on top of a Metamod Source Plugin, allowing developers to create plugins that interact with the game server in a modern language (C#)
[CleanerCS2](https://github.com/Source2ZE/CleanerCS2) | `v1.0.3` | [Poggicek](https://github.com/Poggicek) | Allows you to filter out console prints with regular expressions 
[ServerListPlayersFix](https://github.com/Source2ZE/ServerListPlayersFix) | `1.0.1 SDK Update` | [Poggicek](https://github.com/Poggicek) | Fixes players not showing up in the server browser 
[AnnouncementBroadcaster](https://github.com/lengran/CS2AnnouncementBroadcaster) | `0.3.1` | [Lengrann](https://github.com/lengran) | Conditional messages, OnCommand, OnPlayerConnect, OnRoundStart, and TimerMsgs.
[CS2Rcon](https://github.com/LordFetznschaedl/CS2Rcon) | `1.2.0` | [LordFetznschaedl](https://github.com/LordFetznschaedl/) | This is a rudimentary implementation of a RCON plugin using CounterStrikeSharp as RCON does not work whilst connected to the server
[CSTV-Discord](https://github.com/K4ryuu/CS2-GOTV-Discord) | `1.2.7` | [K4ryuu](https://github.com/K4ryuu/) | Discord Webhook message broadcasts with full-match or single round demo uploads to Mega Upload or direct to Discord.
[CustomRounds](https://github.com/schwarper/cs2-customrounds) | `0.0.9` | [schwarper](https://github.com/schwarper/) | Custom rounds for weapon practice on aim/awp/etc maps when default weapons don't cut it
[Deathmatch](https://github.com/NockyCZ/CS2-Deathmatch) | `1.1.6` | [NockyCZ](https://github.com/NockyCZ/) | Custom Deathmatch plugin (Includes custom spawnpoints, multicfg, gun selection, spawn protection, etc)
[Deathrun Manager](https://github.com/leoskiline/cs2-deathrun-manager) | `0.0.8` | [leoskiline](https://github.com/leoskiline/cs2-deathrun-manager/) | Improves Deathrun gameflow.
[Discord Utilities](https://github.com/NockyCZ/CS2-Discord-Utilities) | `2.0.5` | [NockyCZ](https://github.com/NockyCZ/) | (**Enabled by default.**) 2-Way chat relay, discord role/game-server perm mgmt, event monitoring, and player reporting. [How?](#using-cs2-discordutilities)
[Executes](https://github.com/zwolof/cs2-executes) | `1.0.4` | [zwolof](https://github.com/zwolof/) & [B3none](https://github.com/B3none/) | Implementation of executes. Based on the version for CS:GO by Splewis.
[ExecAfter](https://github.com/kus/CS2_ExecAfter) | `1.0.0` | [Kus](https://github.com/kus/) | Executes a command after server event (i.e. OnMapStart) or a delay.
[GameModeManager](https://github.com/nickj609/GameModeManager)| `1.0.4` | [nickj609](https://github.com/nickj609/) | Simplified administration and voting management for custom modes and map switching/extending.
[GunGame](https://github.com/ssypchenko/cs2-gungame)| `1.1.1` | [ssypchenko](https://github.com/ssypchenko/) | GunGame mode
[K4-Arenas](https://github.com/K4ryuu/K4-Arenas) | `1.4.4` | [K4ryuuu](https://github.com/K4ryuu/) | A plugin that allows players to fight 1v1 in ranked arenas.
[Map Configs Prefix](https://github.com/oqyh/cs2-Map-Configs-Prefix/)| `1.0.5` | [oqyh](https://github.com/oqyh/) | Allows you to quick and easily create unique configuration files for each map on your server.
[MatchZy](https://github.com/shobhit-pathak/MatchZy) | `0.7.11` | [shobhit-pathak](https://github.com/shobhit-pathak/) | MatchZy is a plugin for running and managing practice/pugs/scrims/matches with easy configuration!
MultiModGameStateMgr | `0.0.1` | [audiomaster99](https://github.com/audiomaster99) | Assisting with game states when the server is empty, and gains a player. Be sure to unload with conflicting plugins (ex. Retakes), and reload plugin switching away from conflicting plugins.
[OpenPrefirePrac](https://github.com/lengran/OpenPrefirePrac) | `0.1.37` | [Lengran](https://github.com/lengran/) | Similar to Yprac and Refrag prefire modes.
[Remove Map Weapons](https://github.com/kus/CS2-Remove-Map-Weapons) | `1.0.1` | [Kus](https://github.com/kus/) | Remove weapons from the map as `mp_weapons_allow_map_placed 0` does not work.
[Retakes](https://github.com/B3none/cs2-retakes) | `2.0.5` | [B3none](https://github.com/B3none/) | Implementation of retakes. Based on the version for CS:GO by Splewis.
[Retakes Allocator](https://github.com/yonilerner/cs2-retakes-allocator) | `2.3.10` | [yonilerner](https://github.com/yonilerner/) | Advanced weapon allocation for retakes
[BombAnnouncer](https://github.com/audiomaster99/CS2BombsiteAnnouncer) | `0.0.6` | [audiomaster99](https://github.com/audiomaster99/) | Graphical Bombsite Announcer using Center HUD image capability.
[Instadefuse](https://github.com/B3none/cs2-instadefuse) | `1.4.3` | [B3none](https://github.com/B3none/) | Allows a CT to instantly defuse the bomb when nothing can prevent defusal. 
[RockTheVote](https://github.com/abnerfs/cs2-rockthevote) | `1.8.5-custombuild` | [abnerfs](https://github.com/abnerfs) | General purpose CS2 map voting plugin.
[SimpleAdmin](https://github.com/connercsbn/SimpleAdmin/) | `v0.1.2` | [connercsbn](https://github.com/connercsbn/) | Adds basic administrator functions
[SharpTimer](https://github.com/DEAFPS/SharpTimer/) | `0.2.6` | [DEAFPS](https://github.com/DEAFPS/) | All-in-One BHop/KZ/Surf/etc timer, movement-unlocker, ranking, and stats plugin
[Tags](https://github.com/daffyyyy/CS2-Tags) | `Build 36` | [daffyyyy](https://github.com/daffyyyy/) | Adds Tags to a select group of clients' aliases on the server
[Whitelist](https://github.com/PhantomYopta/CS2_WhiteList) | `1.0.0` | [PhantomYopta](https://github.com/PhantomYopta/) | Restricts access to the server for SteamID members/employees listed in the whitelist. [How?](#enable-whitelist-so-only-a-list-of-people-can-play)

## Custom files

> [!NOTE]  
> Any reference to a path is always the root of the installation. Which on Linux will typically be `/home/steam/cs2/` and on Windows where ever you extracted the zip.
>
> For example on Linux:
> `/custom_files/addons/counterstrikesharp/configs/admins.json` full path is `/home/steam/cs2/custom_files/addons/counterstrikesharp/configs/admins.json`
> `/game/csgo/addons/counterstrikesharp/configs/admins.json` full path is `/home/steam/cs2/game/csgo/addons/counterstrikesharp/configs/admins.json`

Any changes you have made to the files in this mod will be overwritten when the update scripts are ran. I have created a folder `/custom_files/` in the root of the project, where you mirror the contents of the `csgo/` folder, and any files you want to tweak, you put in there in the same spot and they will always overwrite the mods default files.

So this can be used to set the server hostname to something you want, set the RCON or serverpassword or set the admins of the server.

You can see an example of what I use on my server in the `/custom_files_example/` directory, which sets the hostname, server image and admins.

For example; if you want to add yourself as an admin, that file is located `/game/csgo/addons/counterstrikesharp/configs/admins.json`. So to make your tweak to it, you would copy that file to `/custom_files/addons/counterstrikesharp/configs/admins.json` and add yourself as an admin at the bottom. Then when the update scripts run, it will copy your custom file at `/custom_files/addons/counterstrikesharp/configs/admins.json` and overwrite the default mod file at `/game/csgo/addons/counterstrikesharp/configs/admins.json`.

If you want to change the server name, or make any changes to any mod settings use the `/cfg/custom_MOD.cfg` as it executes at the end and can overwrite any setting. So if you wanted to change the server name for GunGame, you would copy `/game/csgo/cfg/custom_dm.cfg` to `/custom_files/cfg/custom_dm.cfg` and and write `hostname "shipREKT GunGame +Deathmatch +Turbo"` and any other settings you want and this file will overwrite `/game/csgo/cfg/custom_dm.cfg` each time the `gcp.sh`/`install.sh`/`win.bat` script is ran, and these settings will run at the end when you load the GunGame mod.

### Dynamically creates config files in plugin folder

If a plugin creates a config file in the plugins folder where the dll is (i.e.: `/game/csgo/addons/counterstrikesharp/plugins/CS2AnnouncementBroadcaster/cfg/messages.json`) it will be deleted when the server starts as the `addons` folder is deleted to make sure old plugins are removed if I removed them. You need to copy this file and your changes to your `/custom_files/` folder so it merges it back in. You would put the example file in `/custom_files/addons/counterstrikesharp/plugins/CS2AnnouncementBroadcaster/cfg/messages.json` and every time the server starts it will merge it back in and you will have your changes.

To generate this directory, you can run the `gcp.sh` script (if on Google Cloud), `install.sh` script on Linux once or on `win.bat` script on Windows where you extracted the mod zip and this is where you would put your custom modifications.

## Creating an online server

If you are hosting an online server, you need to create a Steam [Game Login Token](https://steamcommunity.com/dev/managegameservers), your server will not run online without this. Put this value in the `STEAM_ACCOUNT` environment variable.

You also need to create an [authorization key](http://steamcommunity.com/dev/apikey) which will allow your server to download maps from the workshop. Put this value in the `API_KEY` environment variable.

See all available [environment variables](#environment-variables).

**You must connect to the server from the public IP, not the LAN IP even if you are on the same network. The script logs the public IP `Starting server on XXX.XXX.XXX.XXX:27015`**

## Creating a LAN server

Set the environment variable `LAN` to `1`.

You also need to create an [authorization key](http://steamcommunity.com/dev/apikey) which will allow your server to download maps from the workshop. Put this value in the `API_KEY` environment variable.

See all available [environment variables](#environment-variables).

## Environment variables

### Available via environment variable only

*On Windows set these in `win.ini`.*

Key | Default value | What is it
--- | --- | ---
`API_KEY` | `changeme` | To download maps from the workshop, your server needs access to the steam web api. To allow this you'll need an authorization key which you can generate [here](http://steamcommunity.com/dev/apikey)
`IP` | `` | Not required. Allows the server IP to be set. Useful if a CS2 server needs to be bound to a specific IP address.
`PORT` | `27015` | Server port
`MAXPLAYERS` | `32` | Max player limit
`CUSTOM_FOLDER` | `custom_files` | Folder of your own modifications to the mod that mirror the csgo/ structure and overwrite the mode files. More on that [here](#custom-files)
`RCON_PASSWORD` | `changeme` | RCON password to control server from console also remotely configure
`STEAM_ACCOUNT` | `` | To host a server online, you need to create a Steam [Game Login Token](https://steamcommunity.com/dev/managegameservers). Your server will not run online without this
`SERVER_PASSWORD` | `` | If you want a password protected server
`LAN` | `0` | If the server is a LAN only server
`EXEC` | `on_boot.cfg` | Config file to run when server boots. If switching gamemode, it's recommended to do a delay see the example `on_boot.cfg` file
`DUCK_DOMAIN` | `` | (Linux only) [Duck DNS](https://www.duckdns.org/) domain if you want to utalise the free service to get a domain for your server instead of IP
`DUCK_TOKEN` | `` | (Linux only) [Duck DNS](https://www.duckdns.org/) access token to update domain when server boots

### Playing workshop maps/collections

To download maps from the workshop, your server needs access to the steam web api. To allow this you'll need an authorization key which you can generate [here](http://steamcommunity.com/dev/apikey) and set `API_KEY` to the key.

The console command for hosting a workshop map is `host_workshop_map fileid` where `fileid` is the number that comes after `?id=` in the workshop URL for example: [https://steamcommunity.com/sharedfiles/filedetails/?id=2433686680](https://steamcommunity.com/sharedfiles/filedetails/?id=2433686680)

The console command for hosting a workshop collection is `host_workshop_collection collectionid` where `collectionid` is the number that comes after `?id=` in the workshop URL for example: [https://steamcommunity.com/sharedfiles/filedetails/?id=1092904694](https://steamcommunity.com/sharedfiles/filedetails/?id=1092904694). This command will then download all maps in the collection and create a mapgroup out of them, then host it.

### Setting maps for different game modes

Copy the file `/game/csgo/gamemodes_server.txt` following the [custom files](#custom-files) steps (`/custom_files/gamemodes_server.txt`) and add the maps you want per gamemode. Most gamemodes fall under casual, but I have created unique groups for each mode so adding your own maps is easy by updating this one file.

It isn't required, but you should add the fileid into `/game/csgo/subscribed_file_ids.txt` following the [custom files](#custom-files) steps (`/custom_files/subscribed_file_ids.txt`) so the server keeps it up to date.

## Running on Google Cloud

### Create firewall rule

```
gcloud compute firewall-rules create source \
--allow tcp:27015-27020,tcp:80,udp:27015-27020
```

### Create instance

Ensure you have all the settings for your [environment variables](#environment-variables).

If you have issues with the server not handling load, you may want to consider [compute-optimized](https://cloud.google.com/compute/vm-instance-pricing#compute-optimized_machine_types) machine `c2-standard-4`.

```
gcloud beta compute instances create <instance-name> \
--maintenance-policy=TERMINATE \
--project=<project> \
--zone=australia-southeast1-c \
--machine-type=n2-standard-2 \
--network-tier=PREMIUM \
--metadata=RCON_PASSWORD=changeme,STEAM_ACCOUNT=changeme,API_KEY=changeme,DUCK_DOMAIN=changeme,DUCK_TOKEN=changeme,startup-script="echo \"Delaying for 30 seconds...\" && sleep 30 && cd / && /gcp.sh" \
--no-restart-on-failure \
--scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/compute.readonly,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append \
--tags=source \
--image-family=ubuntu-2204-lts \
--image-project=ubuntu-os-cloud \
--boot-disk-size=60GB \
--boot-disk-type=pd-standard \
--boot-disk-device-name=<instance-name>
```

### SSH to server

```
gcloud compute ssh <instance-name> \
--zone=australia-southeast1-c
```

### Install mod

```
sudo su
cd / && curl --silent --output "gcp.sh" "https://raw.githubusercontent.com/mavproductions/cs2-modded-server/master/gcp.sh" && chmod +x gcp.sh && bash gcp.sh
```

If the installation has paused for a long time, restart the server and do it again.

### Stop server

```
gcloud compute instances stop <instance-name> \
--zone australia-southeast1-c
```

### Start server

```
gcloud compute instances start <instance-name> \
--zone australia-southeast1-c
```

### Delete server

```
gcloud compute instances delete <instance-name> \
--zone australia-southeast1-c
```

### Push file to server from local machine

For example a map:

```
On local:
gcloud config set project <project>
cd /path/to/folder
gcloud compute scp de_kus.vpk root@<instance-name>:/home/steam/cs2/game/csgo/maps --zone australia-southeast1-c

On server SSH:
cd /home/steam/cs2/game/csgo/maps
chown steam:steam de_kus.vpk
chmod 644 de_kus.vpk
```

### Download from server

`gcloud compute scp root@<instance-name>:/home/steam/cs2/gamecsgo/cfg/comp.cfg  ~/Desktop/`

### Turn VM off at 3:30AM every day

SSH into the VM

Switch to root `sudo su`

Check the timezone your server is running in `sudo hwclock --show`

Open crontab file `nano /etc/crontab`

Append to the end of the crontab file `30 3    * * *   root    shutdown -h now`

Save `CTRL + X`

## Running on Linux

Make sure you have **60GB free space**.

Ensure you have all the settings for your [environment variables](#environment-variables).

- **If setting up internet server:**

   Set environment variable `STEAM_ACCOUNT` to your [Game Server Login Token](https://steamcommunity.com/dev/managegameservers)

   Make sure you [port forward](https://portforward.com/router.htm) on your router TCP: `27015` and UDP: `27015` & `27020` so players can connect from the internet.

   **You must connect to the server from the public IP, not the LAN IP even if you are on the same network. The script logs the public IP `Starting server on XXX.XXX.XXX.XXX:27015`**

- **If setting up LAN server:**

   Set environment variable `LAN` to `1`

```
sudo su
export RCON_PASSWORD="changeme"
export API_KEY="changeme"
export STEAM_ACCOUNT=""
export SERVER_PASSWORD=""
export PORT="27015"
export MAXPLAYERS="32"
cd / && curl --silent --output "install.sh" "https://raw.githubusercontent.com/mavproductions/cs2-modded-server/master/install.sh" && chmod +x install.sh && bash install.sh
```

- **If running for the first time**

To check everything is working correctly run the following commands in the server console:

- `meta list` and you should see `CounterStrikeSharp` in the output
- `css_plugins list` and you should see a few plugins in the output

If you see content in both; everything is working.

When you join the server you can [change game modes](#changing-game-modes).

## Running in Docker

*Only tested on Windows 11 with WSL2 integration as backend*

Make sure Docker is installed and about 40 GB disk space is free.

You can either Download this repo and extract it to where you want your server (i.e. C:\Server\cs2-modded-server) or use git and clone the repo `git clone https://github.com/mavproductions/cs2-modded-server.git` and run your server from inside of it. This way you can simply git pull updates.

- **If setting up for internet server:**

   Set `STEAM_ACCOUNT` variable in `.env`-file in the root if the repository. For workshop maps set `API_KEY` in `.env`-file.

- **Build docker image:**

`docker build -t cs2-modded-server .`

- **Run the server**

`docker compose up`

## Running on Windows

Make sure you have **60GB free space**.

You can either [Download this repo](https://github.com/mavproductions/cs2-modded-server/archive/master.zip) and extract it to where you want your server (i.e. `C:\Server\cs2-modded-server`) or use git and clone the repo `git clone https://github.com/mavproductions/cs2-modded-server.git` and run your server from inside of it. This way you can simply `git pull` updates.

All the following instructions will use the repo folder location as the root.

Create a folder `steamcmd` and [download SteamCMD](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip) and extract it inside `steamcmd` so you should have `\steamcmd\steamcmd.exe`.

To download maps from the workshop, your server [needs access](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive/Dedicated_Servers#Steam_Workshop) to the Steam Web API. To allow this, open `\win.ini` and set `cs_api_key` to your [Steam Web API Key](http://steamcommunity.com/dev/apikey).

- **If setting up internet server:**

   Open `\win.ini`

   Set `IP` to your [public ip](http://checkip.amazonaws.com/)

   Set `STEAM_ACCOUNT` to your [Game Server Login Token](https://steamcommunity.com/dev/managegameservers)

   Set `API_KEY` to your [Steam Web API key](http://steamcommunity.com/dev/apikey) (required to play workshop maps)

   Make sure you [port forward](https://portforward.com/router.htm) on your router TCP: `27015` and UDP: `27015` & `27020` so players can connect from the internet.

   **You must connect to the server from the public IP, not the LAN IP even if you are on the same network.**

- **If setting up LAN server:**

   Open `\win.ini`

   Set `LAN` to `1`

   Set `API_KEY` to your [Steam Web API key](http://steamcommunity.com/dev/apikey) (required to play workshop maps)

Accept both Private and Public connections on Windows Firewall.

- **If running for the first time**

To check everything is working correctly run the following commands in the server console:

- `meta list` and you should see `CounterStrikeSharp` in the output
- `css_plugins list` and you should see a few plugins in the output

If you see content in both; everything is working.

When you join the server you can [change game modes](#changing-game-modes).

## FAQ

### Player commands

#### !rtv

Players can start a vote to change the map in the current mod by typing `!rtv` in chat.

<img alt="Vote to change map" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/assets/rtv.png?raw=true&sanitize=true">

#### !gamemode

Players can start a vote to change the game mode by typing `!gamemode` in chat.

<img alt="Vote to change game mode" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/assets/vote-gamemode.png?raw=true&sanitize=true">

You can also start a specific game mode vote by typing `!comp`, `!wingman`, `1.6`, `!dm`, `!gg`, `!1v1`, `!awp`, `!aim`, `!prefire`, `!executes`, `!retake`, `!prac`, `!bhop`, `!kz`, `!surf`, `!minigames`, `!deathrun`, `!course`, `!scoutzknivez`, `!hns`, `!soccer`.

### What maps are preconfigured with each mode?

#### mg_10mans

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_overpass.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_overpass<br><sup><sub>changelevel de_overpass</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/0Tac8MA.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3121217565">de_thera</a><br><sup><sub>host_workshop_map 3121217565</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cbble.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070212801">de_cbble</a><br><sup><sub>host_workshop_map 3070212801</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cache.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070244931">de_cache</a><br><sup><sub>host_workshop_map 3070244931</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/Qh7DZxx.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3073892687">de_season</a><br><sup><sub>host_workshop_map 3073892687</sub></sup></td></tr></table></td></tr></table>

#### mg_active

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table></td></tr></table>

#### mg_aimmap

<table><tr><td><table align="left"><tr><td><img height="112" src="https://i.imgur.com/iKslJNx.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3140763900">1v1_hospital</a><br><sup><sub>host_workshop_map 3140763900</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_map_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3222291463">aim_map_classic</a><br><sup><sub>host_workshop_map 3222291463</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/Zwvowyz.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070260370">aim_map_s2r</a><br><sup><sub>host_workshop_map 3070260370</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://imgur.com/Lz4Wfmp.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3146122036">freebet_aim_map</a><br><sup><sub>host_workshop_map 3146122036</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/HCfNHYz.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171874934">aim_inspire</a><br><sup><sub>host_workshop_map 3171874934</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fy_pool_day.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070923343">fy_pool_day</a><br><sup><sub>host_workshop_map 3070923343</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_multigame.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3245740485">aim_multigame</a><br><sup><sub>host_workshop_map 3245740485</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/oOCbcV8.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3157627939">aim_valerastan</a><br><sup><sub>host_workshop_map 3157627939</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/TDXouwX.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3177201515">aim_anubis</a><br><sup><sub>host_workshop_map 3177201515</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://imgur.com/0DiSL5W.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3165438553">aim_deaglepark</a><br><sup><sub>host_workshop_map 3165438553</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://imgur.com/vdp5tbL.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3090340064">aim_ancient</a><br><sup><sub>host_workshop_map 3090340064</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/rJRuCkP.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3163827658">aim_refrag</a><br><sup><sub>host_workshop_map 3163827658</sub></sup></td></tr></table></td></tr></table>

#### mg_awp

<table><tr><td><table align="left"><tr><td><img height="112" src="https://i.imgur.com/w6GeWig.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3142070597">awp_bhop_rocket</a><br><sup><sub>host_workshop_map 3142070597</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/5pysjJX.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3109027085">awp_minecraft</a><br><sup><sub>host_workshop_map 3109027085</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/AWiSqu4.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3088944650">awp_lego_2_winter</a><br><sup><sub>host_workshop_map 3088944650</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://imgur.com/4dWz2aM.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3081154235">awp_creek</a><br><sup><sub>host_workshop_map 3081154235</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/YlGPeCC.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3166593524">awp_japan_neon_cs</a><br><sup><sub>host_workshop_map 3166593524</sub></sup></td></tr></table></td></tr></table>

#### mg_bhop

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_at_night.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077211069">bhop_at_night</a><br><sup><sub>host_workshop_map 3077211069</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_dunedash.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3118806244">bhop_dunedash</a><br><sup><sub>host_workshop_map 3118806244</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_internetclub.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3103286752">bhop_internetclub</a><br><sup><sub>host_workshop_map 3103286752</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_ragnarok.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077153735">bhop_ragnarok</a><br><sup><sub>host_workshop_map 3077153735</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_zunron.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077475505">bhop_zunron</a><br><sup><sub>host_workshop_map 3077475505</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_1derland.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077596014">bhop_1derland</a><br><sup><sub>host_workshop_map 3077596014</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_whiteshit.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3078523849">bhop_whiteshit</a><br><sup><sub>host_workshop_map 3078523849</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_cherryblossom.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082038560">bhop_cherryblossom</a><br><sup><sub>host_workshop_map 3082038560</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_arcturus.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3088973190">bhop_arcturus</a><br><sup><sub>host_workshop_map 3088973190</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_kiwi_cwfx.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3095219437">bhop_kiwi_cwfx</a><br><sup><sub>host_workshop_map 3095219437</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/GVtA0IL.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3079959870">bhop_omnitopia</a><br><sup><sub>host_workshop_map 3079959870</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/bhop_vaporwave.png?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3247326328">bhop_vaporwave</a><br><sup><sub>host_workshop_map 3247326328</sub></sup></td></tr></table></td></tr></table>

#### mg_casual

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_italy.jpg?raw=true&sanitize=true"></td></tr><tr><td>cs_italy<br><sup><sub>changelevel cs_italy</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_office.jpg?raw=true&sanitize=true"></td></tr><tr><td>cs_office<br><sup><sub>changelevel cs_office</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_assembly.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071005299">de_assembly</a><br><sup><sub>host_workshop_map 3071005299</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_aztec.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070960099">de_aztec</a><br><sup><sub>host_workshop_map 3070960099</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cbble.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070212801">de_cbble</a><br><sup><sub>host_workshop_map 3070212801</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_pipeline.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3079872050">de_pipeline</a><br><sup><sub>host_workshop_map 3079872050</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_biome.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3075706807">de_biome</a><br><sup><sub>host_workshop_map 3075706807</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/guardian.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3255907412">guardian</a><br><sup><sub>host_workshop_map 3255907412</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mp_raid.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070346180">mp_raid</a><br><sup><sub>host_workshop_map 3070346180</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mutiny.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070766070">de_mutiny</a><br><sup><sub>host_workshop_map 3070766070</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_assault.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070594412">cs_assault</a><br><sup><sub>host_workshop_map 3070594412</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_militia.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3089953774">cs_militia</a><br><sup><sub>host_workshop_map 3089953774</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://imgur.com/sK7gXvF.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=33186779271">minecraft</a><br><sup><sub>host_workshop_map 3186779271</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_akiba.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3108513658">de_akiba</a><br><sup><sub>host_workshop_map 3108513658</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_rats_1337_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3161693626">de_rats_1337_v2</a><br><sup><sub>host_workshop_map 3161693626</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/msZ1pvD.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071818846">de_rats_kitchoon</a><br><sup><sub>host_workshop_map 3071818846</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/jesDX7V.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077457651">de_survivor</a><br><sup><sub>host_workshop_map 3077457651</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/ZmuhagV.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3084930277">fy_snow_y0</a><br><sup><sub>host_workshop_map 3084930277</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ruins_d_prefab.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072352643">de_ruins_d_prefab</a><br><sup><sub>host_workshop_map 3072352643</sub></sup></td></tr></table></td></tr></table>

#### mg_Casual-1.6

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_map_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3222291463">aim_map_classic</a><br><sup><sub>host_workshop_map 3222291463</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/as_oilrig.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3104677430">as_oilrig</a><br><sup><sub>host_workshop_map 3104677430</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_assault_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3215705579">cs_assault_classic</a><br><sup><sub>host_workshop_map 3215705579</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_aztec_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3213800338">de_aztec_classic</a><br><sup><sub>host_workshop_map 3213800338</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3078095785">de_dust_classic</a><br><sup><sub>host_workshop_map 3078095785</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070363499">de_dust2_classic</a><br><sup><sub>host_workshop_map 3070363499</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3172269001">de_inferno_classic</a><br><sup><sub>host_workshop_map 3172269001</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_italy_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3212419403">cs_italy_classic</a><br><sup><sub>host_workshop_map 3212419403</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_militia_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3144773563">cs_militia_classic</a><br><sup><sub>host_workshop_map 3144773563</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3205793205">de_nuke_classic</a><br><sup><sub>host_workshop_map 3205793205</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_office_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3216844784">cs_office_classic</a><br><sup><sub>host_workshop_map 3216844784</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_survivor_classic.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3217247541">de_survivor_classic</a><br><sup><sub>host_workshop_map 3217247541</sub></sup></td></tr></table></td></tr></table>

#### mg_course

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cr_devisland_p1_v1.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3076483842">cr_devisland_p1_v1</a><br><sup><sub>host_workshop_map 3076483842</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_switch_course_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070439729">mg_switch_course_v2</a><br><sup><sub>host_workshop_map 3070439729</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cr_minecraft_jb_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070896876">cr_minecraft_jb_v2</a><br><sup><sub>host_workshop_map 3070896876</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_metro_course_v1.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070463151">mg_metro_course_v1</a><br><sup><sub>host_workshop_map 3070463151</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_alley_course_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070455802">mg_alley_course_v2</a><br><sup><sub>host_workshop_map 3070455802</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_glave_course_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070445185">mg_glave_course_v2</a><br><sup><sub>host_workshop_map 3070445185</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_office_course_v3.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070459211">mg_office_course_v3</a><br><sup><sub>host_workshop_map 3070459211</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_metal_course_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070464208">mg_metal_course_v2</a><br><sup><sub>host_workshop_map 3070464208</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_acrophobia_run_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070463620">mg_acrophobia_run_v2</a><br><sup><sub>host_workshop_map 3070463620</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_metro_course_s2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071040020">mg_metro_course_s2</a><br><sup><sub>host_workshop_map 3071040020</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_circle_course_v3.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070434475">mg_circle_course_v3</a><br><sup><sub>host_workshop_map 3070434475</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_simpsons_course_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070447697">mg_simpsons_course_v2</a><br><sup><sub>host_workshop_map 3070447697</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_sonic_course_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070452642">mg_sonic_course_v2</a><br><sup><sub>host_workshop_map 3070452642</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_sky_realm_v3.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070451616">mg_sky_realm_v3</a><br><sup><sub>host_workshop_map 3070451616</sub></sup></td></tr></table></td></tr></table>

#### mg_deathrun

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/deathrun_playground.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3164611860">deathrun_playground</a><br><sup><sub>host_workshop_map 3164611860</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/deathrun_civilization.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3188021118">deathrun_civilization</a><br><sup><sub>host_workshop_map 3188021118</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/deathrun_iceworld_cs2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3083325292">deathrun_iceworld_cs2</a><br><sup><sub>host_workshop_map 3083325292</sub></sup></td></tr></table></td></tr></table>

#### mg_dm-multicfg

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table></td></tr></table>

#### mg_dm-valve

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_italy.jpg?raw=true&sanitize=true"></td></tr><tr><td>cs_italy<br><sup><sub>changelevel cs_italy</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_office.jpg?raw=true&sanitize=true"></td></tr><tr><td>cs_office<br><sup><sub>changelevel cs_office</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_overpass.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_overpass<br><sup><sub>changelevel de_overpass</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_shoots.jpg?raw=true&sanitize=true"></td></tr><tr><td>ar_shoots<br><sup><sub>changelevel ar_shoots</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_baggage.jpg?raw=true&sanitize=true"></td></tr><tr><td>ar_baggage<br><sup><sub>changelevel ar_baggage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/gd_rialto.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3085490518">gd_rialto</a><br><sup><sub>host_workshop_map 3085490518</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_safehouse.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070550406">de_safehouse</a><br><sup><sub>host_workshop_map 3070550406</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_lake.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3219506727">de_lake</a><br><sup><sub>host_workshop_map 3219506727</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_bank.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070581293">de_bank</a><br><sup><sub>host_workshop_map 3070581293</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_shortdust.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070612859">de_shortdust</a><br><sup><sub>host_workshop_map 3070612859</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fy_pool_day.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070923343">fy_pool_day</a><br><sup><sub>host_workshop_map 3070923343</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fy_iceworld.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070238628">fy_iceworld</a><br><sup><sub>host_workshop_map 3070238628</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/daymare.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072640420">daymare</a><br><sup><sub>host_workshop_map 3072640420</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_theorem.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070348309">aim_theorem</a><br><sup><sub>host_workshop_map 3070348309</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_assembly.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071005299">de_assembly</a><br><sup><sub>host_workshop_map 3071005299</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cbble.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070212801">de_cbble</a><br><sup><sub>host_workshop_map 3070212801</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cache.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070244931">de_cache</a><br><sup><sub>host_workshop_map 3070244931</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_pipeline.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3079872050">de_pipeline</a><br><sup><sub>host_workshop_map 3079872050</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_biome.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3075706807">de_biome</a><br><sup><sub>host_workshop_map 3075706807</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/dm_desk.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077599381">dm_desk</a><br><sup><sub>host_workshop_map 3077599381</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fun_bounce.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3088183343">fun_bounce</a><br><sup><sub>host_workshop_map 3088183343</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/1v1aim_map_longdustversion_d.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082605693">1v1aim_map_longdustversion_d</a><br><sup><sub>host_workshop_map 3082605693</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_churches_s2r.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070291913">ar_churches_s2r</a><br><sup><sub>host_workshop_map 3070291913</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_ag_texture_city_advanced.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082113929">aim_ag_texture_city_advanced</a><br><sup><sub>host_workshop_map 3082113929</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/traningoutside.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3080973179">traningoutside</a><br><sup><sub>host_workshop_map 3080973179</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/shipment_version_1_0.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3086555291">shipment_version_1_0</a><br><sup><sub>host_workshop_map 3086555291</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_ag_texture2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3074961197">aim_ag_texture2</a><br><sup><sub>host_workshop_map 3074961197</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_ag_texture_jungle.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3095778105">aim_ag_texture_jungle</a><br><sup><sub>host_workshop_map 3095778105</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs2_bloodstrike.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071890065">cs2_bloodstrike</a><br><sup><sub>host_workshop_map 3071890065</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/gg_simpsons_vs_flanders_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3109232789">gg_simpsons_vs_flanders_v2</a><br><sup><sub>host_workshop_map 3109232789</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_akiba.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3108513658">de_akiba</a><br><sup><sub>host_workshop_map 3108513658</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_facingworlds-99.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3112806723">cs_facingworlds-99</a><br><sup><sub>host_workshop_map 3112806723</sub></sup></td></tr></table></td></tr></table>

#### mg_executes

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table></td></tr></table>

#### mg_gungame

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_shoots.jpg?raw=true&sanitize=true"></td></tr><tr><td>ar_shoots<br><sup><sub>changelevel ar_shoots</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_baggage.jpg?raw=true&sanitize=true"></td></tr><tr><td>ar_baggage<br><sup><sub>changelevel ar_baggage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fy_pool_day.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070923343">fy_pool_day</a><br><sup><sub>host_workshop_map 3070923343</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fy_iceworld.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070238628">fy_iceworld</a><br><sup><sub>host_workshop_map 3070238628</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/daymare.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072640420">daymare</a><br><sup><sub>host_workshop_map 3072640420</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_theorem.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070348309">aim_theorem</a><br><sup><sub>host_workshop_map 3070348309</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_safehouse.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070550406">de_safehouse</a><br><sup><sub>host_workshop_map 3070550406</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_lake.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3219506727">de_lake</a><br><sup><sub>host_workshop_map 3219506727</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_bank.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070581293">de_bank</a><br><sup><sub>host_workshop_map 3070581293</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/fun_bounce.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3088183343">fun_bounce</a><br><sup><sub>host_workshop_map 3088183343</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/1v1aim_map_longdustversion_d.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082605693">1v1aim_map_longdustversion_d</a><br><sup><sub>host_workshop_map 3082605693</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_churches_s2r.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070291913">ar_churches_s2r</a><br><sup><sub>host_workshop_map 3070291913</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_ag_texture_city_advanced.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082113929">aim_ag_texture_city_advanced</a><br><sup><sub>host_workshop_map 3082113929</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/traningoutside.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3080973179">traningoutside</a><br><sup><sub>host_workshop_map 3080973179</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/shipment_version_1_0.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3086555291">shipment_version_1_0</a><br><sup><sub>host_workshop_map 3086555291</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_ag_texture2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3074961197">aim_ag_texture2</a><br><sup><sub>host_workshop_map 3074961197</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_ag_texture_jungle.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3095778105">aim_ag_texture_jungle</a><br><sup><sub>host_workshop_map 3095778105</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs2_bloodstrike.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071890065">cs2_bloodstrike</a><br><sup><sub>host_workshop_map 3071890065</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/gg_simpsons_vs_flanders_v2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3109232789">gg_simpsons_vs_flanders_v2</a><br><sup><sub>host_workshop_map 3109232789</sub></sup></td></tr></table></td></tr></table>

#### mg_hidenseek

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/infernohideandseek.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3097563690">infernohideandseek</a><br><sup><sub>host_workshop_map 3097563690</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/seek_town_bs.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3074479691">seek_town_bs</a><br><sup><sub>host_workshop_map 3074479691</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/winterday_bs.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070951079">winterday_bs</a><br><sup><sub>host_workshop_map 3070951079</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/minus_denhet.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070541369">minus_denhet</a><br><sup><sub>host_workshop_map 3070541369</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/hs_lake.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071094345">hs_lake</a><br><sup><sub>host_workshop_map 3071094345</sub></sup></td></tr></table></td></tr></table>

#### mg_kz

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/only_up.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3074758439">only_up</a><br><sup><sub>host_workshop_map 3074758439</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_hub.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070220367">kz_hub</a><br><sup><sub>host_workshop_map 3070220367</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_checkmate.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070194623">kz_checkmate</a><br><sup><sub>host_workshop_map 3070194623</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_victoria.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3086304337">kz_victoria</a><br><sup><sub>host_workshop_map 3086304337</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_rc_stonehenge.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072219045">kz_rc_stonehenge</a><br><sup><sub>host_workshop_map 3072219045</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_sxb2_cxz.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3083714192">kz_sxb2_cxz</a><br><sup><sub>host_workshop_map 3083714192</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_rc_twotowers.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3083509404">kz_rc_twotowers</a><br><sup><sub>host_workshop_map 3083509404</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_simplyhard.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3078311932">kz_simplyhard</a><br><sup><sub>host_workshop_map 3078311932</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_nomibo.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3077122656">kz_nomibo</a><br><sup><sub>host_workshop_map 3077122656</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_sxb2_biewan.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3076000218">kz_sxb2_biewan</a><br><sup><sub>host_workshop_map 3076000218</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_ggsh.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072744536">kz_ggsh</a><br><sup><sub>host_workshop_map 3072744536</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_ltt.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072699538">kz_ltt</a><br><sup><sub>host_workshop_map 3072699538</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/Yx4d5hr.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3121168339">kz_grotto</a><br><sup><sub>host_workshop_map 3121168339</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/kz_igneous.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3102712799">kz_igneous</a><br><sup><sub>host_workshop_map 3102712799</sub></sup></td></tr></table></td></tr></table>

#### mg_minigames

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_skeet_multigames_v7.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082120895">mg_skeet_multigames_v7</a><br><sup><sub>host_workshop_map 3082120895</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_warmcup_headshot.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3076765511">mg_warmcup_headshot</a><br><sup><sub>host_workshop_map 3076765511</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/deathrun_iceworld_cs2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3083325292">deathrun_iceworld_cs2</a><br><sup><sub>host_workshop_map 3083325292</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_lego_minigames.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3097973183">mg_lego_minigames</a><br><sup><sub>host_workshop_map 3097973183</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_legospace_multigames.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3188024686">mg_legospace_multigames</a><br><sup><sub>host_workshop_map 3188024686</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_multigames_devine_is_french.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3111582979">mg_multigames_devine_is_french</a><br><sup><sub>host_workshop_map 3111582979</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_wl_multigames.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3156615586">mg_wl_multigames</a><br><sup><sub>host_workshop_map 3156615586</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_swag_multigames_v7_1.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3101960156">mg_swag_multigames_v7_1</a><br><sup><sub>host_workshop_map 3101960156</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_pudding_multigames_cs2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3242033080">mg_pudding_multigames_cs2</a><br><sup><sub>host_workshop_map 3242033080</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mg_saw_v64_cs2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3106085501">mg_saw_v64_cs2</a><br><sup><sub>host_workshop_map 3106085501</sub></sup></td></tr></table></td></tr></table>

#### mg_minimaps

<table><tr><td><table align="left"><tr><td><img height="112" src="https://i.imgur.com/zBeIaN4.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3099519038">minimirage_cs2port</a><br><sup><sub>host_workshop_map 3099519038</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/EAuiiwq.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3078140567">mini_train</a><br><sup><sub>host_workshop_map 3078140567</sub></sup></td></tr></table></td></tr></table>

#### mg_multi1v1-arena

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/am_anubis_p.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3242420753">am_anubis_p</a><br><sup><sub>host_workshop_map 3242420753</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/am_duels_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3262582924">am_duels_mirage</a><br><sup><sub>host_workshop_map 3262582924</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/am_garden.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3179186642">am_garden</a><br><sup><sub>host_workshop_map 3179186642</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/am_minecraft_pierdolnik.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3197575080">am_minecraft_pierdolnik</a><br><sup><sub>host_workshop_map 3197575080</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/aim_redline_fp.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070253400">aim_redline_fp</a><br><sup><sub>host_workshop_map 3070253400</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/am_zen.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3180965466">am_zen</a><br><sup><sub>host_workshop_map 3180965466</sub></sup></td></tr></table></td></tr></table>

#### mg_prac

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_overpass.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_overpass<br><sup><sub>changelevel de_overpass</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/0Tac8MA.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3121217565">de_thera</a><br><sup><sub>host_workshop_map 3121217565</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cbble.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070212801">de_cbble</a><br><sup><sub>host_workshop_map 3070212801</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cache.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070244931">de_cache</a><br><sup><sub>host_workshop_map 3070244931</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/Qh7DZxx.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3073892687">de_season</a><br><sup><sub>host_workshop_map 3073892687</sub></sup></td></tr></table></td></tr></table>

#### mg_prefire

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_overpass.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_overpass<br><sup><sub>changelevel de_overpass</sub></sup></td></tr></table></td></tr></table>

#### mg_retakes

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_overpass.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_overpass<br><sup><sub>changelevel de_overpass</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table></td></tr></table>

#### mg_scoutzknivez

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/scoutzknivez_pure_cs2.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3073929825">scoutzknivez_pure_cs2</a><br><sup><sub>host_workshop_map 3073929825</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_dizzy.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070553020">ar_dizzy</a><br><sup><sub>host_workshop_map 3070553020</sub></sup></td></tr></table></td></tr></table>

#### mg_soccer

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ka_soccer_2009.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070198374">ka_soccer_2009</a><br><sup><sub>host_workshop_map 3070198374</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/field.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3238565662">field</a><br><sup><sub>host_workshop_map 3238565662</sub></sup></td></tr></table></td></tr></table>

#### mg_surf

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_aquaflow.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3255589335">surf_aquaflow</a><br><sup><sub>host_workshop_map 3255589335</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_kitsune.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3076153623">surf_kitsune</a><br><sup><sub>host_workshop_map 3076153623</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_utopia_njv.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3073875025">surf_utopia_njv</a><br><sup><sub>host_workshop_map 3073875025</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_mesa_aether.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3125360522">surf_mesa_aether</a><br><sup><sub>host_workshop_map 3125360522</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_nyx.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3129698096">surf_nyx</a><br><sup><sub>host_workshop_map 3129698096</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_beginner.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070321829">surf_beginner</a><br><sup><sub>host_workshop_map 3070321829</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_inui.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3255525511">surf_inui</a><br><sup><sub>host_workshop_map 3255525511</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_mesa_revo.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3076980482">surf_mesa_revo</a><br><sup><sub>host_workshop_map 3076980482</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_deathstar.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3080544577">surf_deathstar</a><br><sup><sub>host_workshop_map 3080544577</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_rookie.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3082548297">surf_rookie</a><br><sup><sub>host_workshop_map 3082548297</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_benevolent.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3098972556">surf_benevolent</a><br><sup><sub>host_workshop_map 3098972556</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_boreas.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3133346713">surf_boreas</a><br><sup><sub>host_workshop_map 3133346713</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/surf_ace.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3088413071">surf_ace</a><br><sup><sub>host_workshop_map 3088413071</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://i.imgur.com/7mpFGZq.jpg"></td></tr><tr><td><a href="https://steamcommunity.com/workshop/filedetails/?id=3165517928">surf_astra</a><br><sup><sub>host_workshop_map 3165517928</sub></sup></td></tr></table></td></tr></table>

#### mg_wingman

<table><tr><td><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_italy.jpg?raw=true&sanitize=true"></td></tr><tr><td>cs_italy<br><sup><sub>changelevel cs_italy</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_office.jpg?raw=true&sanitize=true"></td></tr><tr><td>cs_office<br><sup><sub>changelevel cs_office</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ancient.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_ancient<br><sup><sub>changelevel de_ancient</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_anubis.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_anubis<br><sup><sub>changelevel de_anubis</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_dust2.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_dust2<br><sup><sub>changelevel de_dust2</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_inferno.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_inferno<br><sup><sub>changelevel de_inferno</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mirage.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_mirage<br><sup><sub>changelevel de_mirage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_nuke.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_nuke<br><sup><sub>changelevel de_nuke</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_overpass.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_overpass<br><sup><sub>changelevel de_overpass</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_vertigo.jpg?raw=true&sanitize=true"></td></tr><tr><td>de_vertigo<br><sup><sub>changelevel de_vertigo</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_shoots.jpg?raw=true&sanitize=true"></td></tr><tr><td>ar_shoots<br><sup><sub>changelevel ar_shoots</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/ar_baggage.jpg?raw=true&sanitize=true"></td></tr><tr><td>ar_baggage<br><sup><sub>changelevel ar_baggage</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/gd_rialto.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3085490518">gd_rialto</a><br><sup><sub>host_workshop_map 3085490518</sub></sup></td></tr></table>
<table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/gd_rialto.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3219506727">de_lake</a><br><sup><sub>host_workshop_map 3219506727</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_safehouse.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070550406">de_safehouse</a><br><sup><sub>host_workshop_map 3070550406</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_bank.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070581293">de_bank</a><br><sup><sub>host_workshop_map 3070581293</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_shortdust.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070612859">de_shortdust</a><br><sup><sub>host_workshop_map 3070612859</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_assembly.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3071005299">de_assembly</a><br><sup><sub>host_workshop_map 3071005299</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cbble.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070212801">de_cbble</a><br><sup><sub>host_workshop_map 3070212801</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_cache.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070244931">de_cache</a><br><sup><sub>host_workshop_map 3070244931</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_pipeline.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3079872050">de_pipeline</a><br><sup><sub>host_workshop_map 3079872050</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_biome.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3075706807">de_biome</a><br><sup><sub>host_workshop_map 3075706807</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/mp_raid.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070346180">mp_raid</a><br><sup><sub>host_workshop_map 3070346180</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_mutiny.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070766070">de_mutiny</a><br><sup><sub>host_workshop_map 3070766070</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/cs_assault.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3070594412">cs_assault</a><br><sup><sub>host_workshop_map 3070594412</sub></sup></td></tr></table><table align="left"><tr><td><img height="112" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/images/de_ruins_d_prefab.jpg?raw=true&sanitize=true"></td></tr><tr><td><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3072352643">de_ruins_d_prefab</a><br><sup><sub>host_workshop_map 3072352643</sub></sup></td></tr></table></td></tr></table>

### How do I add more bots?

By default bots are enabled in deathmatch, gungame, gungame ffa, retakes, scoutsknives and wingman.

The default is set to add 1 bot if only 1 human is in the server, and then if there is 2 or more humans there will be no bots.

You can overwrite the settings for the bots by creating a "[custom file](#custom-files)" for this file [custom_bots.cfg](https://github.com/mavproductions/cs2-modded-server/blob/master/game/csgo/cfg/custom_bots.cfg).

If you copy [custom_bots.cfg](https://github.com/mavproductions/cs2-modded-server/blob/master/game/csgo/cfg/custom_bots.cfg) and put it in the `custom_files/cfg/` directory (`/home/steam/cs2/custom_files/cfg/` on default Linux setup) and you can modify it and change say `bot_quota` to `10` if you want 10 players at all times. When the server starts (on Linux and Windows) it will merge this file into the game cfg and it will execute every time `bots.cfg` executes.

You can also just login to RCON `rcon_password yourpassword` and use `rcon bot_add_ct` and `rcon bot_add_t`.

If you want to remove bots you use `rcon bot_kick`.

### Failed to open libtier0.so

`Failed to open libtier0.so (/home/steam/cs2/bin/libgcc_s.so.1: version 'GCC_7.0.0' not found (required by /lib/i386-linux-gnu/libstdc++.so.6))`

This is because Valve ships their own copies of those libraries. As modern systems will have newer versions, you can safely delete the listed file from the server install. Do not delete the file in the system path (usually lib or lib32)[*](https://wiki.alliedmods.net/Installing_metamod:source).

`cd /home/steam/cs2/bin/` and `rm libgcc_s.so.1` and restart the server.

### How do I connect to RCON remotely?

[Download SourceAdminTool](https://nightly.link/Drifter321/admintool/workflows/build/master) ([source](https://github.com/Drifter321/admintool)) for your OS (you can read about it [here](https://forums.alliedmods.net/showthread.php?t=289370)) and click `Servers > Add Servers` and put in the `<IP>:27015` and when you see the server show in the list, down the bottom left type in your RCON password and click `Login` and you should be able to execute commands from the bottom text box i.e. `exec dm.cfg`

**You must connect to the server from the public IP if hosting an online server, not the LAN IP even if you are on the same network. The script logs the public IP `Starting server on XXX.XXX.XXX.XXX:27015`**

### Why can't I set the server to start automatically with a mod loaded

Because the way the server is setup with several mods it's not possible. You can't use `+exec` in the server launcher as that executes to quick before SourceMod is loaded. You can monitor the server once it's started (via RCON) and then load a mod i.e. `exec dm.cfg`.

### Acessing admin menu

Admins are managed by [CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) using the [Admin Framework](https://docs.cssharp.dev/admin-framework/defining-admins/). You define admins and their flags and most plugins now utilise this framework.

To see an example of my admins you can look at this file [/custom_files_example/addons/counterstrikesharp/configs/admins.json](https://github.com/mavproductions/cs2-modded-server/blob/master/custom_files_example/addons/counterstrikesharp/configs/admins.json). To set your admins on your own server use this file as a reference and use the [custom files](#custom-files) system to have your own version.

### Use number keys to operate menu instead of typing !1 in chat

If you don't like having to type in chat !number every time you want to use a menu item; you can use this trick to bind the corresponding !number command to the number key. So when you press 1 it will select the 1 option:

_Note: This is assuming you are using the standard binds. You can change accordingly for your own setup._

```
bind "1" "slot1; css_1"
bind "2" "slot2; css_2"
bind "3" "slot3; css_3"
bind "4" "slot4; css_4"
bind "5" "slot5; css_5"
bind "6" "slot6; css_6"
bind "7" "slot7; css_7"
bind "8" "slot8; css_8"
bind "9" "slot9; css_9"
bind "0" "slot10; css_0"
```

### Changing maps

<img alt="Admin change map menu" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/assets/admin-maps.png?raw=true&sanitize=true">

Admins can type `!maps` in chat and it will bring up a menu of all the maps for the current mod. When a map is selected it will change the map straight away.

At the end of the map (if time runs out or win conditions are met) it a vote will show to choose a map from the current mod.

### Changing game modes

<img alt="Admin change game mode menu" src="https://github.com/mavproductions/cs2-modded-server/blob/assets/assets/admin-modes.png?raw=true&sanitize=true">

Admins can type `!modes` in chat and it will bring up a menu of all the game modes. Simply choose one and it will switch to that game mode and change to a default map for that game mode.

The maps in `!maps` will also update to the new game mode when it has changed.

You can also change directly to a game mode with the Rcon commands via chat i.e. `!rcon exec dm` will change to deathmatch.

These are all the available chat commands to change the game mode:

| Command                   | Game mode                                                                         |
| ------------------------- | --------------------------------------------------------------------------------- |
| `!mode 1v1`          | 1v1 (allows more than 2 players)                                                  |
| `!mode aim`          | Aim Maps                                                                          |
| `!mode awp`          | AWP Maps                                                                          |
| `!mode ar`           | Arms Race                                                                         |
| `!mode bhop`         | Bunny hop maps                                                                    |
| `!mode casual`       | Casual/Fun maps                                                                   |
| `!mode comp`         | 10mans/scrims/match environment featuring MatchZy `matchzy_autostart_mode 1`      |
| `!mode course`       | Tests players with different traps, kz, surf, bhop                                |
| `!mode dm`           | Deathmatch                                                                        |
| `!mode dm-multicfg`  | Deathmatch Multi-CFG                                                              |
| `!mode executes`     | Similar to Retakes, but simulates round-play before bomb plants. Hence "Executes" |
| `!mode gg`           | Gun Game                                                                          |
| `!mode hns`          | Hide n Seek                                                                       |
| `!mode kz`           | Kreedz Climbing                                                                   |
| `!mode minigames`    | Mini Games                                                                        |
| `!mode miniMaps`     | Mini-style Maps (ie. mini_mirage)                                                 |
| `!mode prac`         | Practice environment featuring MatchZy `matchzy_autostart_mode 2`                 |
| `!mode prefire`      | OpenPrefirePrac (similar to Yprac or Refrag.gg)                                   |
| `!mode retakes`      | Retakes                                                                           |
| `!mode scoutzknivez` | ScoutzKnivez                                                                      |
| `!mode soccer`       | Soccer                                                                            |
| `!mode surf`         | Surf                                                                              |
| `!mode wingman`      | Wingman (allows more than 4 players)                                              |

Changing between gamemodes multiple times is not recommended, and it is better if you restart the CS2 server in-between.

To view what other commands are available view the plugins at the top of the page.

### RCON doesn't work

Using RCON whilst connected to the server does not work. See discussion [here](https://www.reddit.com/r/GlobalOffensive/comments/167spzi/cs2_rcon/).
The current work arounds are:

- I have included [CS2Rcon](https://github.com/LordFetznschaedl/CS2Rcon) which allows admins to use !rcon in chat.
- You can disconnect from the server and use `rcon_address IP:PORT` in console and you can use rcon commands.
- Use an external RCON program which has implemented the RCON protocol such as [this](https://github.com/fpaezf/CS2-RCON-Tool-V2).

If it still doesn't work, make sure you try connect from CS2 outside of a game via console:

**You must connect to the server from the public IP if hosting an online server, not the LAN IP even if you are on the same network. The script logs the public IP `Starting server on XXX.XXX.XXX.XXX:27015`**

```bash
rcon_address ip:port
rcon_password "password"
rcon say "hi"
```

And check the ports cs2 is using on your OS i.e. on Ubuntu `sudo lsof -i -P -n | head -n 1; sudo lsof -i -P -n | grep cs2`.

### Manually updating Metamod:Source and CounterStrikeSharp

If you are on a unix based system, you can run `scripts/check-updates.sh` which will check the current versions of each plugin installed in this repo vs what the latest is, this makes it easier than going through each one manually.

Go to the Releases page for [Metamod:Source](http://www.sourcemm.net/downloads.php?branch=master) and [CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) and download the latest. You need to merge the `addons` folder from the zips into the `/game/csgo/addons` of this repo. This is easy to do with unix based systems with rsync:

First open terminal and `cd` into the folder where you unzipped the zips i.e.: `cd ~/Downloads` then update the command below with the full path to the repo and run it:

`rsync -rhavz --exclude "._*" --exclude ".DS_Store" --partial --progress --stats ./addons/ /Users/kus/dev/personal/counter-strike/cs2-modded-server/game/csgo/addons/`

### Broadcasts

If you want to disable Broadcasts on your server, unload the plugin by putting the directory `/game/csgo/addons/counterstrikesharp/plugins/CS2AnnouncementBroadcaster/` in your disabled folder. If you wish for it to only be used on certain modes. Add `css_plugins unload "CS2 Announcement Broadcaster"` to your `unload_plugins.cfg` and `css_plugins load "plugins/disabled/CS2AnnouncementBroadcaster/CS2AnnouncementBroadcaster.dll"` in your `comp.cfg` (competitive 5vs5 for example).

You can also leave it in the `/plugins/disabled` folder and in you can put it in your `/custom_files/cfg/custom_all.cfg` file.

The config file is located at `/game/csgo/addons/counterstrikesharp/plugins/CS2AnnouncementBroadcaster/cfg/messages.json` which you would put in `/custom_files/addons/counterstrikesharp/plugins/CS2AnnouncementBroadcaster/cfg/messages.json` so it is not overwritten.

### Using DiscordUtilities

DiscordUtilities is enabled by default. I have left it enabled as I find it useful, and relatively straight-forward to setup. [Here](https://docs.sourcefactory.eu/cs2-free-plugins/discord-utilities) is a setup guide for installing to your discord, along with the optional MySQL DB linking, which I recommend for administrating community-led servers. You can remove modules as you please.

### RockTheVote (RTV)

RockTheVote is currently configured to only be used on modes where map extending isn't generally required (Casual, Multi1v1-Arenas, GunGame, Retakes, etc.). Currently RTV doesn't support extending map by `x` rounds/minutes, so modes like Surf, KZ, BHop, and other modes where time requirements are player(s) dependent, are disabled. Enable on all modes by simply adding `css_plugins load "plugins/disabled/RockTheVote/RockTheVote.dll"` to `/custom_files/cfg/custom_all.cfg`.

### Enable Whitelist so only a list of people can play

If you want to enable a whitelist on your server load the plugin by putting this `css_plugins load "plugins/disabled/WhiteList/WhiteList.dll"` in one of your `.cfg` files.

If you want it to load on every mod on your server, you can put it in your `/custom_files/cfg/custom_all.cfg` file.

The whitelist file is located at `/game/csgo/addons/counterstrikesharp/plugins/disabled/WhiteList/whitelist.txt` which you would put in `/custom_files/addons/counterstrikesharp/plugins/disabled/WhiteList/whitelist.txt` so it is not overwritten.

## License

See `LICENSE` for more details.