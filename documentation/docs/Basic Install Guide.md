# :material-folder-cog: Basic Install Guide

## Host your Server {: #hosting }
* Setup your host server
    - Forward ports 
        - **CS2 Server([SRCDS](https://developer.valvesoftware.com/wiki/Source_Dedicated_Server#Connectivity))** `27015`(TCP/UDP) -`27020`(UDP)
            - Can change `27015` with SRCDS command-line argument `-port`
        - **CS2-Battle-Bot** `8000` (TCP) by default
    - Create a user with system-rights (`steam` linux script user default)
    - Configure your SSH Public/Private keys to use with [FileZilla](https://filezilla-project.org/download.php?type=client)/[Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)/[Termius](https://termius.com/download/)/[mRemoteNG](https://mremoteng.org/download)/etc.
* Environment Variables
    - [Windows](https://github.com/mavproductions/cs2-modded-server/blob/master/win.ini)
    - [Linux](https://github.com/mavproductions/cs2-modded-server/blob/c8a60bb4728eb5997ece1588fde8e2a5d7cd19d9/install.sh#L7) 
    - [Docker](https://github.com/mavproductions/cs2-modded-server/blob/master/Dockerfile) 
    - [GoogleCloudPlatform(GCP)](https://github.com/mavproductions/cs2-modded-server/blob/c8a60bb4728eb5997ece1588fde8e2a5d7cd19d9/gcp.sh#L40)
    !!! note "Tip - GoogleCloudPlatform ENV Variables"
        [Project-based Metadata Environment Variables](https://console.cloud.google.com/compute/metadata)<br>
        or<br>
        **VM-Based Metadata Environment Variables** - Select your VM instance, click Edit, and scroll-down to metadata section and add your environment variables/values per that instance.
* Secrets
    - Copy [secrets.cfg](https://github.com/mavproductions/cs2-modded-server/blob/master/game/csgo/cfg/secrets.cfg) to `/custom_files/cfg/secrets.cfg`
    - Configure `sv_setsteamaccount` to the ID [here](https://steamcommunity.com/dev/managegameservers)
* Install and Configure [MySQL](MySQL Setup.md)
* Run either the [Windows](https://github.com/mavproductions/cs2-modded-server/blob/master/win.bat), [Linux](https://github.com/mavproductions/cs2-modded-server/blob/master/install.sh), [Docker](https://github.com/mavproductions/cs2-modded-server/blob/master/Dockerfile), [GCP](https://github.com/mavproductions/cs2-modded-server/blob/master/gcp.sh), or [Run.sh](https://github.com/mavproductions/cs2-modded-server/blob/master/run.sh) script.
    - Download [GCloud](https://cloud.google.com/sdk/docs/install) for GCP installs as this will make the setup much faster.
        - [Example GCP instance script here](gcpscript.md)
    - [Run.sh](https://github.com/mavproductions/cs2-modded-server/blob/master/run.sh) is for updating and launching the server only. All files must be in place. (Custom_files will not be over-written)

!!! note "Trust, but verify!"
    * Type `meta list` via RCON         
        Your output should look like:

            Listing 1 plugin:
            
            [01] CounterStrikeSharp (v213 @ dfc9859) by Roflmuffin
    * Type `css_plugins list` via RCON         
        Your output should look like:

              List of all plugins currently loaded by CounterStrikeSharp: 7 plugins loaded.
                [#1:LOADED]: "SimpleAdmin" (0.1.2)
                [#2:LOADED]: "CS2-Tags" (1.0.4c) by daffyy
                Add player tags easily in cs2 game
                [#3:LOADED]: "CS2_ExecAfter" (1.0.0) by Kus (https://github.com/kus)
                Executes a command after server event or a delay. exec_after for help
                [#4:LOADED]: "Discord Utilities" (1.0.9) by Nocky (SourceFactory.eu)
                [#5:LOADED]: "GameModeManager" (1.0.1) by Striker-Nick
                A simple plugin/module that dynamically updates any maplist.txt file based on the current mapgroup.
                [#6:LOADED]: "CS2Rcon" (1.2.0) by LordFetznschaedl
                Allows for server commands to be executed from the client using !rcon
                [#7:LOADED]: "Map Configs Prefix" (1.0.5) by Gold KingZ
                Map Configs Depend Map Name

### Environment Variables {: #env-vars }

Variable | Linux | GCP | Windows | Docker
--- | --- | --- | --- | ---
API_KEY <br>[For using steam workshop](http://steamcommunity.com/dev/apikey) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/start.sh#L36) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L41) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/win.ini#L8) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/.env#L3)
IP | | | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/win.ini#L1) | |
PORT | | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L47) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/win.ini#L6)| |
DUCK_DOMAIN | | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L50) | | 
DUCK_TOKEN | | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L51) | | 
CUSTOM_FOLDER | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/start.sh#L72) | | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/win.ini#L3) | 
GIT_REPO | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/install.sh#L8) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L43) | | 
WS_COLLECTION | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/install.sh#L10) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L45) | | | 
MAXPLAYERS |[✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/start.sh#L44) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/gcp.sh#L49) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/win.ini#L5) | [✓](https://github.com/mavproductions/cs2-modded-server/blob/7e26e47bc7561888e6b9fa6bfb8515495bb9a518/.env#L2) |

!!! note ""Harden" your variables"
    For most environment variables, they are formatted as `export DUCK_DOMAIN="${DUCK_DOMAIN:-$(get_metadata DUCK_DOMAIN)}"`

    You can change them to format `export DUCK_DOMAIN="${DUCK_DOMAIN:-blah.duckdns.org}"` 
    to hard code `blah.duckdns.org` as your duck_domain.

Be aware that setting a collectionID forces the server to batch download all the maps. This can utilize a lot of space, and take a long time on first load.

### Secrets.cfg {: #secrets }
    RCON_PASSWORD "changeme"  # RCON password for controlling server via console.
    STEAM_ACCOUNT ""          # https://steamcommunity.com/dev/managegameservers code is currently optional but might be enforced later by Valve. It will also allow the server to appear on the server browser
    SERVER_PASSWORD ""        # For password-protected servers
    

### Workshop Maps
Hosting Workshop maps requires the [API Key](http://steamcommunity.com/dev/apikey). To switch to a workshop map, run `host_workshop_map <workshopID>`.       
Ex. `host_workshop_map 3171874934` via RCON would switch you to aim_inspire by MavProductions.

### Server Browser Recognition
Add your [GSLT](https://steamcommunity.com/dev/managegameservers) for your server to appear on the server browser master list. [ServerListPlayerFix](https://github.com/Source2ZE/ServerListPlayersFix) is also recommended currently, as this will make the server player list available.