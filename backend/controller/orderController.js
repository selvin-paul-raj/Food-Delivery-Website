
import dotenv from 'dotenv';
import Stripe from "stripe"
import orderModel from "../modal/orderModel.js"
import userModel from "../modal/userModel.js"
dotenv.config();
//global variable
const currency="inr"
const DeliveryCharges=50

//gateway initialize
const stripe=new Stripe(process.env.STRIPE_SECRET)
console.log(process.env.STRIPE_SECRET);


//place orders using COD
const placeOrder=async (req,res)=>{
    const userId = req.UserId;
    const user = await userModel.findById({_id:userId});

    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }
    try {
        const {items, amount, address} =req.body

        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
      
        

        const newOrder=await orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})


        res.json({ success: true, msg: "Order Placed Successfully" });  
    } catch (error) {
        res.json({ success: false, msg:error.message});
    }

}



//place orders using stripe
const placeOrderStripe = async (req, res) => {
    const userId = req.UserId;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }
    try {
        const { items, amount, address } = req.body;
        const { origin } = req.headers;
        
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "stripe",
            payment: false,
            date: Date.now()
        };
        
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        // Generate line items for Stripe
        const line_items = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)  
            },
            quantity: item.quantity
        }));
        
        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: Math.round(DeliveryCharges * 100)  // Convert to smallest currency unit
            },
            quantity: 1
        });
        
        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`
        });
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, msg: error.message });
    }
};


//verify stripe 
const verifyStripe=async(req,res)=>{
   try {
    const {orderId, success ,userId}=req.body
    if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true})  
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({ success: true, message:"Payment Updated"});
    }else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({ success: false, message:"Payment Cancel"});  
    }
   } catch (error) {
    console.log(error);
    res.json({ success: false, msg:error.message});
   }
}


//All orders data from admin
const allOrder=async(req,res)=>{
    try{
        const orders=await orderModel.find({})
        res.json({ success: true, orders});
        } catch (error) {
            console.log(error);
            res.json({ success: false, msg:error.message});
        }
    
}

//user orders data from fronted
const userOrder=async (req,res)=>{
    const userId = req.UserId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }
    try{
    const orders=await orderModel.find({userId})
    console.log(orders);
    
    res.json({ success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg:error.message});
    }
}

//update orders data from admin
const updateOrder=async(req,res)=>{

    try {
        const {orderId,status} =req.body
        await orderModel.findByIdAndUpdate(orderId,{status})  
        res.json({ success: true, message:"Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg:error.message});
    }
    
}

export {placeOrder,placeOrderStripe,allOrder,userOrder,updateOrder,verifyStripe}
