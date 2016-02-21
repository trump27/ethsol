contract ContractRegi {
    struct ContractInfo {
        string name;
        address addr;
        string abi;
        string source;
    }
    ContractInfo[] public contractInfos;
    // mapping (string => ContractInfo) mapContractInfos;
    function addContract(string name, address addr,
        string abi, string source) {
        contractInfos.push(ContractInfo({
           name: name,
           addr: addr,
           abi: abi,
           source: source
        }));
    }
    function clearData() {
        delete contractInfos;
    }
    function getCount() constant returns (uint ret) {
        return contractInfos.length;
    }
    function getContInfo(uint idx) constant returns (
        string name, address addr, string abi, string source
        ) {
        ContractInfo memory rec = contractInfos[idx];
        return (rec.name, rec.addr, rec.abi, rec.source);
    }
}