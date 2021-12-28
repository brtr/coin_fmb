(function() {
  let loginAddress;
  const TargetTokenAddress = "";
  const TargetChain = "";
  const serverUrl = "";
  const appId = "";
  Moralis.start({ serverUrl, appId });

  const loginButton = document.getElementById('btn-login');
  const logoutButton = document.getElementById('btn-logout');
  const address = document.getElementById('address');
  const claimButton = document.getElementById('btn-claim');

  const toggleLoader = function() {
    const x = document.getElementById('loader');
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  const toggleLoginBtns = function() {
    if (loginAddress == null) {
      loginButton.style.display = "block"
      logoutButton.style.display = "none"
      address.style.display = "none"
    } else {
      loginButton.style.display = "none"
      logoutButton.style.display = "block"

      address.textContent = loginAddress;
      address.style.display = "block"
    }
  }

  const login = function() {
    Moralis.authenticate()
    .then(function (user) {
      loginAddress = user.get("ethAddress");
      toggleLoader();
      toggleLoginBtns();
      console.log(loginAddress);
    })
    .catch(function (error) {
      toggleLoader();
      toggleLoginBtns();
      console.log('Error: ', error);
    });
  }

  // Check if user is logged in
  const checkUserLogin = function() {
    Moralis.User.currentAsync()
      .then(function(user) {
        if (!user) {
          alert("You need login first");
          toggleLoader();
          login();
        }
      })
      .catch(function (error) {
        console.log('Error: ', error);
      });
  }

  // Check if user change account
  const checkUser = async function() {
    Moralis.onAccountsChanged(async function(accounts) {
      const confirmed = confirm("Link this address to your account?");
      if (confirmed) {
        await Moralis.User.current().fetch();
        loginAddress = accounts[0];
        await Moralis.enableWeb3();
        toggleLoginBtns()
        console.log("Account changed: ", loginAddress);
      }
    });

    const user = await Moralis.User.current();
    Moralis.enableWeb3(); if (user);
    loginAddress = user ? user.get("ethAddress") : null;
    toggleLoginBtns()
    toggleLoader();
    console.log("Account changed: ", loginAddress);
  };

  checkUser();

  loginButton.addEventListener('click', function () {
    toggleLoader();
    login();
  })

  logoutButton.addEventListener('click', function () {
    toggleLoader();
    Moralis.User.logOut()
      .then(function () {
        loginAddress = null;
        toggleLoader();
        toggleLoginBtns();
      })
      .catch(function (error) {
        toggleLoader();
        console.log('Error: ', error);
      });
  })

  claimButton.addEventListener('click', function() {
    checkUserLogin();
    Moralis.Web3API.account.getNFTsForContract({chain: TargetChain, address: loginAddress, token_address: TargetTokenAddress})
      .then(function(nfts) {
        console.log(nfts);
        if (nfts["result"].length > 0) {
          toggleLoader();
          airDrop();
        } else {
          alert("You can't claim fmb")
        }
      })
  })

  const airDrop = function() {
    ajax.post({
      url: '/airdrop',
      data: {
        address: loginAddress
      },
    })
      .then(response => {
        console.log(response.body);
        if (response.body == "success") {
          toggleLoader();
          alert("Claim fmb success");
        }
      })
      .catch(console.error);
  }
})();
