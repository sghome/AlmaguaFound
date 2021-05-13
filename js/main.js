let account;
let projectUrl;
var currentContract;

var contract = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

var abi = [ { "constant": false, "inputs": [ { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "urlString", "type": "string" }, { "name": "durationInDays", "type": "uint256" }, { "name": "amountToRaise", "type": "uint256" } ], "name": "startProject", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "contractAddress", "type": "address" }, { "indexed": false, "name": "projectStarter", "type": "address" }, { "indexed": false, "name": "projectTitle", "type": "string" }, { "indexed": false, "name": "projectDesc", "type": "string" }, { "indexed": false, "name": "projectUrl", "type": "string" }, { "indexed": false, "name": "deadline", "type": "uint256" }, { "indexed": false, "name": "goalAmount", "type": "uint256" } ], "name": "ProjectStarted", "type": "event" }, { "constant": true, "inputs": [ { "name": "urlString", "type": "string" } ], "name": "getProject", "outputs": [ { "name": "projectStarter", "type": "address" }, { "name": "projectTitle", "type": "string" }, { "name": "projectDesc", "type": "string" }, { "name": "projectContract", "type": "address" }, { "name": "created", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "currentAmount", "type": "uint256" }, { "name": "goalAmount", "type": "uint256" }, { "name": "state", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "urlString", "type": "string" } ], "name": "getProjectCreator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "returnAllProjects", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" } ];

var abi2 = [ { "constant": true, "inputs": [], "name": "creator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "amountGoal", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "raiseBy", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "contributions", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "title", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "completeAt", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getDetailsWithoutState", "outputs": [ { "name": "projectStarter", "type": "address" }, { "name": "projectTitle", "type": "string" }, { "name": "projectDesc", "type": "string" }, { "name": "projectContract", "type": "address" }, { "name": "deadline", "type": "uint256" }, { "name": "currentAmount", "type": "uint256" }, { "name": "goalAmount", "type": "uint256" }, { "name": "stated", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "urlString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "description", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "checkIfFundingCompleteOrExpired", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getRefund", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "state", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "currentBalance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "contribute", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getDetails", "outputs": [ { "name": "projectStarter", "type": "address" }, { "name": "projectTitle", "type": "string" }, { "name": "projectDesc", "type": "string" }, { "name": "deadline", "type": "uint256" }, { "name": "currentState", "type": "uint8" }, { "name": "currentAmount", "type": "uint256" }, { "name": "goalAmount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "projectStarter", "type": "address" }, { "name": "projectTitle", "type": "string" }, { "name": "projectDesc", "type": "string" }, { "name": "projectUrl", "type": "string" }, { "name": "fundRaisingDeadline", "type": "uint256" }, { "name": "goalAmount", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "contributor", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "currentTotal", "type": "uint256" } ], "name": "FundingReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "recipient", "type": "address" } ], "name": "CreatorPaid", "type": "event" } ];

// --- INITIALIZE IPFS.JS ---
var ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', {protocol: 'https'});

function upload(data) {
  // PROCESS UPLOAD:
  // Get selected image
  var file = document.getElementById('appimage').files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log("Got image contents: ", reader.result);
    var fileString = reader.result;

    // Create new app object to store metadata
    var newApp = {
      //title: $('#title').val(),
      //description: $('#description').val(),
      image: fileString
    };

    // Upload app/metadata object to IPFS:
    console.log("Upload to IPFS: ", newApp, JSON.stringify(newApp));
    var metadata = JSON.stringify(newApp);

    const Buffer = window.IpfsApi().Buffer;
    var ifpsBuffer = Buffer.from(metadata);
    ipfs.add([ifpsBuffer], {pin:false})
      .then(response => {
        var hash = response[0].hash;
        if(hash) {
          console.log(hash);
        }
      });
  };
}

/*
async function ipfsUpload(data) {
  const Buffer = window.IpfsApi().Buffer;
  var ifpsBuffer = Buffer.from(data);
  ipfs.add([ifpsBuffer], {pin:false})
    .then(response => {
      var hash = response[0].hash;
      if(hash) {
        console.log("IPFS hash = ", hash);
        hash = web3.utils.asciiToHex(hash);
        //hash = web3.utils.hexToBytes(hash);
        // Write to blockchain
        console.log("HEXed Hash =", hash);
      }
    }).catch((err) => {
        console.log(err);
        return false;
    });
}
*/

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function fetchIPFS(hash) {
  ipfs.get(hash, function (err, files) {
    files.forEach((file) => {
      //console.log(file.path)
      console.log(file.content.toString('utf8'))
    })
  });
}

// --- INITIALIZE WEB3.JS ---
async function connectAccount() {
  // Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // Request account access if needed
          await ethereum.enable();
          // Acccounts now exposed
          web3.eth.getAccounts(function(err, accounts){
            account = accounts[0];
            console.log("GOT ACCOUNT: ", account);
          });
      } catch (error) {
          // User denied account access...
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.getAccounts(function(err, accounts){
        account = accounts[0];
        console.log("GOT ACCOUNT: ", account);
      });
  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask! Connecting to Infura...');
      window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/e2e047becb2f4637aedd036b540d8bb6"));
  }
}

window.addEventListener('load', async () => {
    connectAccount();
      //contractInstance = new web3.eth.Contract(abi,'0x0ef28ba1d77a6613e196949853407ded602c1a7f'); // MAINNET
    contractInstance = new web3.eth.Contract(abi, contract); // ROPSTEN'
    console.log("Connected to " + contract + " on Ropsten Testnet");

    // Get supplied Ethereum projectUrl from URL:
      if(window.location.hash && window.location.hash.length > 0) {
        var hash = window.location.hash.substr(1);
        projectUrl = hash;
      }
      else if(window.location.pathname.replace('/campaigns/').length > 0) {
        projectUrl = window.location.pathname.replace('/campaigns/', '');
      }
      if(projectUrl && projectUrl.length > 0)
      {
        getProject(projectUrl);
      }
});

function getProject(urlString) {
  if(urlString == '/start.html') return false;
  contractInstance.methods.getProject(urlString).call({from: account}, (error, result) => {
          console.log("Campaign data from web3.js: ", result);

          var today = new Date();
          var cmas = new Date(result.deadline*1000);

          if (today.getMonth()==11 && today.getDate()>25)
          {
            cmas.setFullYear(cmas.getFullYear()+1);
          }
          var one_day=1000*60*60*24;
          var diff = Math.ceil((cmas.getTime()-today.getTime())/(one_day));

          document.getElementById('title-tag').innerHTML = result.projectTitle.replace(/<[^>]*>/g, '').substring(0, 69) + " | Crowdraise - Fund your dreams for free.";
          document.getElementById('title').innerHTML = result.projectTitle;
          document.getElementById('pledged').innerHTML = web3.utils.fromWei(result.currentAmount, 'ether') + ' ETH';
          document.getElementById('funded').innerHTML = web3.utils.fromWei(result.goalAmount, 'ether')  + ' ETH';
          document.getElementById('daysLeft').innerHTML = diff
          document.getElementById('description').innerHTML = result.projectDesc; // TODO: parse
          document.getElementById('slogan').innerHTML = result.projectDesc.replace(/<[^>]*>/g, '').substring(0, 69) + '...';

          document.getElementById('author').innerHTML = "<a href='https://etherscan.io/address/"+result.projectStarter+"' target='_blank'>"+result.projectStarter.substring(0, 13)+"...</a>";

          currentContract = result.projectContract;

          //result.currentAmount = 7777;
          var percentage = Math.min(Math.round((result.currentAmount / result.goalAmount) * 100), 100);

          if(result.projectStarter == account) {
            document.getElementById('forOwner').style.display = 'block';
          } else {
            document.getElementById('forPublic').style.display = 'block';

            // Show reclaim button if campaign ended unsuccessfully
            if(parseInt(result.state) === 1) {
              document.getElementById('reclaim').style.display = 'block';
              document.getElementById('contribute').style.display = 'none';
            }
            if(parseInt(result.state) === 2) {
              document.getElementById('expired').style.display = 'block';
              document.getElementById('contribute').style.display = 'none';
              percentage = 100;
            }
          }

          document.getElementById('progress').style.width = percentage + '%';
          document.getElementById('percentage').innerHTML = percentage;

          var created = new Date(result.created * 1000);
          document.getElementById('created').innerHTML = (created.getMonth() + 1) + '/' + created.getDate() + '/' +  created.getFullYear();

          getContributions(currentContract);
      });
}

function returnAllProjects() {
  contractInstance.methods.returnAllProjects().call({from: account}, (error, result) => {
          console.log("Data from web3.js: ", result);

          //contribute(result.projectContract ...
      });
}

function startProject(title, description, url, days, goalAmount) {
    contractInstance.methods.startProject(title, description, url, days, goalAmount).send({from: account})
    .on('transactionHash', (hash) => {
        // Show loader
        document.getElementById('loader').style.display = 'block';
        alert('Successfully submitted! Please wait...');
    })
    .on('receipt', (receipt) => {
      console.log("Transaction completed ", receipt);
      alert('Campaign created successfully! Now redirecting...')
      window.location.replace("campaigns/"+url);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      //
    })
    .on('error', console.error);
};

function submitForm() {
  // Disable Button Text
  document.getElementById('submit-button').disabled = true;
  document.getElementById('submit-button').innerHTML = 'Loading...';

  // Fetch form data
  var title = document.getElementById('title').value;
  var description = quill.root.innerHTML;
  var url = document.getElementById('url').value;
  var days = document.getElementById('days').value;
  var goalAmount = web3.utils.toWei(document.getElementById('goalAmount').value, 'ether');

  startProject(title, description, url, days, goalAmount);
}


function contribute(amount, address) {
  //if(!amount || parseInt(amount) <= 0 || isNaN(amount))  alert("Please enter a valid donation amount");
  let contractInstance2 = new web3.eth.Contract(abi2, address);
    contractInstance2.methods.contribute().send({from: account, value:web3.utils.toWei( amount, 'ether')})
    .on('transactionHash', (hash) => {
        alert('Successfully submitted! Please wait...');
    })
    .on('receipt', (receipt) => {
      console.log("Transaction confirmed!");
      alert('Your donation was sent! Now refreshing...');
      location.reload();
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      //
    })
    .on('error', console.error);
};

function getContributions(address) {
  let contractInstance3 = new web3.eth.Contract(abi2, address);
  var event = contractInstance3.getPastEvents('FundingReceived', {filter: {contributor: address}, fromBlock: 0, toBlock: 'latest'}, function(error, events){
   if (!error) {
     //console.log(events);
     console.log("Total Contributions = ", events.length);
     document.getElementById("contributorCount").innerHTML = events.length;
     events.forEach(function(item){
       console.log(item.returnValues.contributor + " - " + item.returnValues.amount);

       document.getElementById("conttable").innerHTML = document.getElementById("conttable").innerHTML + '<tr><td><a target="_blank" href="https://etherscan.io/address/'+item.returnValues.contributor+'">'+item.returnValues.contributor.substring(0, 9)+'...</td><td>'+web3.utils.fromWei(item.returnValues.amount, 'ether')+'</td></tr>';//(item.returnValues.contributor + " - " + item.returnValues.amount + "<br />");
     });
   }
    else console.log(error);
  });
}
