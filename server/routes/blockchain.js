const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const Business = require('../models/Business');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Simple ERC-721 NFT Contract ABI (for demo purposes)
const LICENSE_NFT_ABI = [
  "function mint(address to, string memory tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function totalSupply() public view returns (uint256)"
];

// Initialize Ethereum provider
const getProvider = () => {
  return new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://sepolia.infura.io/v3/your_project_id');
};

// Get wallet signer
const getSigner = () => {
  const provider = getProvider();
  return new ethers.Wallet(process.env.ETHEREUM_PRIVATE_KEY || 'demo_key', provider);
};

// Mint license NFT
router.post('/mint-license', authenticateToken, async (req, res) => {
  try {
    const { licenseId, licenseType, businessName } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const license = business.requiredLicenses.id(licenseId);
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    // For demo purposes, we'll simulate the NFT minting
    // In a real implementation, this would interact with an actual smart contract
    
    const mockMintResult = {
      success: true,
      message: 'License NFT minted successfully',
      tokenId: Date.now().toString(),
      transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
      licenseType: licenseType,
      businessName: businessName,
      mintDate: new Date().toISOString(),
      blockchainExplorer: `https://sepolia.etherscan.io/tx/0x${Math.random().toString(16).substr(2, 64)}`
    };

    // Update license with NFT information
    license.nftTokenId = mockMintResult.tokenId;
    license.nftTransactionHash = mockMintResult.transactionHash;
    license.status = 'approved';
    license.approvalDate = new Date();

    await business.save();

    res.json(mockMintResult);

  } catch (error) {
    console.error('NFT minting error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to mint license NFT',
      message: 'Please try again later'
    });
  }
});

// Get NFT details
router.get('/nft/:tokenId', authenticateToken, async (req, res) => {
  try {
    const { tokenId } = req.params;

    // For demo purposes, return mock NFT data
    const mockNFTData = {
      tokenId: tokenId,
      licenseType: 'GST Registration',
      businessName: 'Demo Business',
      issueDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Active',
      blockchainExplorer: `https://sepolia.etherscan.io/token/0x${Math.random().toString(16).substr(2, 40)}/${tokenId}`,
      metadata: {
        name: 'Business License NFT',
        description: 'Digital representation of business license',
        image: 'https://example.com/license-nft.png',
        attributes: [
          { trait_type: 'License Type', value: 'GST Registration' },
          { trait_type: 'Status', value: 'Active' },
          { trait_type: 'Issued Date', value: new Date().toLocaleDateString() }
        ]
      }
    };

    res.json(mockNFTData);

  } catch (error) {
    console.error('NFT fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch NFT details' });
  }
});

// Get all NFTs for a user
router.get('/my-nfts', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const nfts = business.requiredLicenses
      .filter(license => license.nftTokenId)
      .map(license => ({
        tokenId: license.nftTokenId,
        licenseType: license.licenseType,
        status: license.status,
        approvalDate: license.approvalDate,
        transactionHash: license.nftTransactionHash,
        blockchainExplorer: `https://sepolia.etherscan.io/tx/${license.nftTransactionHash}`
      }));

    res.json({ nfts });

  } catch (error) {
    console.error('My NFTs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user NFTs' });
  }
});

// Verify NFT ownership
router.post('/verify-nft', authenticateToken, async (req, res) => {
  try {
    const { tokenId, licenseType } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const license = business.requiredLicenses.find(l => 
      l.nftTokenId === tokenId && l.licenseType === licenseType
    );

    if (!license) {
      return res.status(404).json({ error: 'NFT not found for this user' });
    }

    const verificationResult = {
      verified: true,
      tokenId: tokenId,
      licenseType: licenseType,
      businessName: business.businessName,
      owner: req.user.email,
      issueDate: license.approvalDate,
      status: license.status,
      blockchainProof: `https://sepolia.etherscan.io/tx/${license.nftTransactionHash}`
    };

    res.json(verificationResult);

  } catch (error) {
    console.error('NFT verification error:', error);
    res.status(500).json({ error: 'Failed to verify NFT' });
  }
});

// Get blockchain statistics
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const totalLicenses = business.requiredLicenses.length;
    const nftLicenses = business.requiredLicenses.filter(l => l.nftTokenId).length;
    const pendingLicenses = business.requiredLicenses.filter(l => !l.nftTokenId && l.status === 'approved').length;

    const statistics = {
      totalLicenses,
      nftLicenses,
      pendingLicenses,
      nftPercentage: totalLicenses > 0 ? (nftLicenses / totalLicenses) * 100 : 0,
      blockchainNetwork: 'Ethereum Sepolia Testnet',
      contractAddress: process.env.LICENSE_NFT_CONTRACT_ADDRESS || '0x...'
    };

    res.json(statistics);

  } catch (error) {
    console.error('Blockchain statistics error:', error);
    res.status(500).json({ error: 'Failed to fetch blockchain statistics' });
  }
});

// Demo smart contract interaction (commented out for safety)
/*
router.post('/demo-contract', authenticateToken, async (req, res) => {
  try {
    const provider = getProvider();
    const signer = getSigner();
    
    const contract = new ethers.Contract(
      process.env.LICENSE_NFT_CONTRACT_ADDRESS,
      LICENSE_NFT_ABI,
      signer
    );

    const tx = await contract.mint(
      req.user.walletAddress,
      'ipfs://QmYourTokenURI'
    );

    await tx.wait();

    res.json({ 
      success: true, 
      transactionHash: tx.hash,
      message: 'NFT minted successfully on blockchain'
    });

  } catch (error) {
    console.error('Smart contract error:', error);
    res.status(500).json({ error: 'Smart contract interaction failed' });
  }
});
*/

module.exports = router; 