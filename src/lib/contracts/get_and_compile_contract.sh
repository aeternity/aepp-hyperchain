README.md#!/bin/bash

# Parsing CLI arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -c|--compiler) aesophia_cli="$2"; shift ;;
        -u|--url) url="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Checking for required arguments
if [[ -z "$aesophia_cli" || -z "$url" ]]; then
    echo "Usage: $0 --compiler <aesophia_cli_path> --url <smart_contract_url>"
    exit 1
fi

# Downloading the smart contract
filename=$(basename "$url")
wget -O "$filename" "$url"

# Compiling to ACI
aci_output="${filename%.*}.aci.json"
"$aesophia_cli" --create_json_aci "$filename" -o "$aci_output"
pnpx prettier --write "$aci_output"

# Delete the .aes file
rm "$filename"

echo "Script completed successfully."
