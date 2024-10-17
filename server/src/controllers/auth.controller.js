import Shop from "../models/shop.models.js";
import Customer from "../models/customer.models.js";
import z from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

  const shopSignupSchema = z.object({
    shopName: z.string().min(1, "Shop name is required"),
    ownerName: z.string().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    password: z.string().min(1, "Password is required"),
  });

  const shopLoginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const customerSignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    
  });

  const customerLoginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });


  const shopSignup = async (req, res) => {
    const { shopName, ownerName, email, contactNumber, password } = req.body;
    const result = shopSignupSchema.safeParse(req.body);

    if(!result.success) {
        console.log("error in validating through zod in shopSignup" , result.error.issues)
        res.status(401)
         .json(
            {message : result.error.issues}
         )
    }
    try {
      
      const existingShop = await Shop.findOne({ $or: [{ shopName }, { email }] });
      if (existingShop) {
        return res.status(400).json({ message: 'Shop name or email already in use' });
      }
  
   
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newShop = new Shop({
        shopName,
        ownerName,
        email,
        contactNumber,
        password: hashedPassword,
        shopOwner: true,
      });
  
      
      await newShop.save();
      const token = jwt.sign(
        { id: newShop._id, shopName: newShop.shopName },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        partitioned : true
      };
      res
      .status(200)
      .cookie('access_token', token , options)
      .json({ message: 'shop Signup successful' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const shopLogin = async (req, res) => {

    const result = shopLoginSchema.safeParse(req.body);

    if(!result.success) {
        res.status(401)
         .json(
            {message : result.error.issues}
         )
    }
    const { email, password } = req.body;
  
    try {
      
      const shop = await Shop.findOne({ email });
      if (!shop) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
    
      const isMatch = await bcrypt.compare(password, shop.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
    
      const token = jwt.sign(
        { id: shop._id, shopName: shop.shopName },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );
        
      const {password : pass, ...currUser} = shop._doc;
      console.log("userdata on login" ,currUser);


      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        partitioned : true
      };
      res
      .status(200)
      .cookie('access_token', token , options)
      .json({ message: 'Login successful' , user : currUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const customerSignup = async (req, res) => {
    const { name, email, password } = req.body;
    const result = customerSignupSchema.safeParse(req.body);

    if(!result.success) {
        res.status(401)
         .json(
            {message : result.error.issues}
         )
    }
    try {
  
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newCustomer = new Customer({
        name,
        email,
        password: hashedPassword,
        shopOwner: false,
      });
  
      await newCustomer.save();
  
      const token = jwt.sign(
        { id: newCustomer._id, name: newCustomer.name },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );
  
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        partitioned : true
      };
      res
      .status(200)
      .cookie('access_token', token , options)
      .json({ message: 'Signup successful' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const customerSignin = async (req, res) => {
    const { email, password } = req.body;
    const result = customerLoginSchema.safeParse(req.body);

    if(!result.success) {
        console.log(result.error.issues)
        res.status(401)
         .json(
            {message : result.error.issues}
         )
    }
    try {
      
      const customer = await Customer.findOne({ email });
      if (!customer) {
        console.log("customer not found -- ")
        return res.status(400).json({ message: 'User not found' });
      }
  

      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
   
      const token = jwt.sign(
        { id: customer._id, name: customer.name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
        console.log(customer)

      const {password : pass, ...currUser} = customer._doc;
      console.log("userdata on login" ,currUser);
      
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        partitioned : true
      };
  
      res
      .status(200)
      .cookie('access_token', token , options)
      .json({ message: 'Login successful' , user : currUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  const getCurrentShopUser = async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
  
      const currUser = await Shop.findById(req.user.id);
  
      if (!currUser) {
        return res.status(404).json({ message: 'Shop not found' });
      }
  
      res.status(200).json({
        message: "User fetched successfully",
        shop: currUser
      });
    } catch (error) {
      console.log("Error at current shop user", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
const getCurrentCustomer = async (req, res) => {
  const user = req.user;
  console.log(user);

  try {
    const currUser = await Customer.findById(req.user.id);
    
    if (!currUser) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    console.log(currUser)
    res.status(200).json({
      message: "User fetched successfully",
      customer: currUser
    });
  } catch (error) {
    console.log("Error at current customer", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const logout = (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      partitioned : true
    };
    
    res.clearCookie('access_token', options)
        .status(200)
        .json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export {
  shopLogin,
  shopSignup,
  customerSignin,
  customerSignup,
  getCurrentCustomer,
  getCurrentShopUser,
  logout
}
