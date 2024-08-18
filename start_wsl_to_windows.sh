#!/bin/bash

# This file is to be used in conjunction with expose_wsl_fullstack.bat script (Ran form powershell) that sets
# up the necessary port forwarding for WSL2 to Windows . This script will write the windows IP address 
# that points to the wsl2 backend instance to $REACT_APP_BACKEND_URL. This is necessary because the WSL2 IP 
# address changes on every boot.

if [ -f ~/.wsl_config ]; then
    export $(cat ~/.wsl_config | xargs)
fi

npm start