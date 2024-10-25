This directory contains the contracts which are used by this application.

The script `get_and_compile_contracts.sh` will download the contracts from a given URL, and generate the ACI files.

THIS SCRIPT MUST BE RUN IN THE CURRENT DIRECTORY.

Usage:
```
./get_and_compile_contract.sh --compiler <path to AE CLI> --url  "<contract URL>"
```

Example:
```bash
./get_and_compile_contract.sh --compiler aesophia_cli --url  "https://raw.githubusercontent.com/aeternity/aeternity/refs/heads/master/test/contracts/HCElection.aes"

```
