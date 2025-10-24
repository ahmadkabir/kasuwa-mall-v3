// services/notificationService.js
// This service handles sending order notifications after successful payment

export const sendOrderNotification = async (orderDetails, user, deliveryAddress) => {
  try {
    // In a real implementation, this would make API calls to your backend
    // to send email and WhatsApp notifications
    
    const notificationData = {
      customerName: `${user?.firstname || ''} ${user?.lastname || ''}`.trim(),
      customerEmail: user?.email,
      customerPhone: user?.phone,
      items: orderDetails.products.map(item => ({
        name: item.product,
        description: item.product_id,
        amount: item.total ? (item.total / item.quantity) : 0, // Calculate per item price
        quantity: item.quantity,
        image_url: item.order_image || item.image_urls || null // Include image URL if available
      })),
      totalSum: orderDetails.total,
      reference: orderDetails.payment_reference || 'N/A',
      deliveryAddress: deliveryAddress
    };
    
    console.log('Sending order notification:', notificationData);
    
    // In a real implementation, you would make an API call to your backend
    // const response = await fetch('/api/send-order-notification', {
    //   method: 'POST',
    //   headers: {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${localStorage.getItem('@@token')}`
    // },
    // body: JSON.stringify(notificationData)
    // });
    //
    // return await response.json();
    
    // For now, just log it
    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Error sending order notification:', error);
    throw error;
  }
};

// Format order details for notifications
export const formatOrderForNotification = (orderData, user, deliveryAddress) => {
  const items = orderData.products.map(item => ({
    name: item.product,
    description: item.product_id,
    quantity: item.quantity,
    amount: item.price || (item.total ? (item.total / item.quantity) : 0),
    image_url: item.order_image || item.image_urls || null // Include image URL if available
  }));

  const totalSum = orderData.total || items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

  return {
    items,
    totalSum,
    customer: {
      name: `${user?.firstname || ''} ${user?.lastname || ''}`.trim(),
      email: user?.email,
      phone: user?.phone
    },
    deliveryAddress: deliveryAddress,
    reference: orderData.payment_reference || 'N/A'
  };
};

// Generate email notification template with images
export const generateEmailTemplate = (notificationData) => {
  const { customer, items, totalSum, deliveryAddress, reference } = notificationData;
  
  let emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Kasuwa Mall</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin-bottom: 20px;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .order-details {
            margin: 20px 0;
            border-collapse: collapse;
            width: 100%;
        }
        .order-details th {
            background-color: #f2f2f2;
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        .order-details td {
            padding: 12px;
            border: 1px solid #ddd;
        }
        .item-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 5px;
        }
        .total-row {
            font-weight: bold;
            background-color: #f9f9f9;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background-color: #f2f2f2;
            border-radius: 5px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">KASUWA MALL</div>
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase!</p>
    </div>
    
    <div class="content">
        <h2>Hello ${customer.name},</h2>
        <p>Your payment with reference <strong>${reference}</strong> has been processed successfully.</p>
        
        <h3>Order Details:</h3>
        <table class="order-details">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
`;

  // Add each item row with image
  items.forEach(item => {
    const itemTotal = item.amount * item.quantity;
    emailContent += `
                <tr>
                    <td>${item.name}<br><small>${item.description}</small></td>
                    <td style="text-align: center;">
                        ${item.image_url ? 
                          `<img src="${item.image_url}" alt="${item.name}" class="item-image" onerror="this.style.display='none'">` : 
                          '<div style="width:80px;height:80px;background-color:#f0f0f0;display:flex;align-items:center;justify-content:center;border-radius:5px;">No Image</div>'}
                    </td>
                    <td>${item.quantity}</td>
                    <td>₦${item.amount.toLocaleString()}</td>
                    <td>₦${itemTotal.toLocaleString()}</td>
                </tr>
`;
  });

  emailContent += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="4" style="text-align:right;"><strong>Total:</strong></td>
                    <td><strong>₦${totalSum.toLocaleString()}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <h3>Delivery Information:</h3>
        <p>${deliveryAddress || 'Not specified'}</p>
        
        <div class="footer">
            <p>We appreciate your business and hope you enjoy your purchase!</p>
            <p><strong>- The Kasuwa Mall Team</strong></p>
        </div>
    </div>
</body>
</html>
`;

  return emailContent;
};

// Generate WhatsApp notification message
export const generateWhatsAppMessage = (notificationData) => {
  const { customer, items, totalSum, deliveryAddress, reference } = notificationData;
  
  let message = `🎉 *PAYMENT CONFIRMED - ORDER #${reference}*\n\n`;
  message += `Hello ${customer.name},\n`;
  message += `Your payment has been processed successfully. Thank you for shopping with Kasuwa Mall!\n\n`;
  
  message += `*ORDER DETAILS:*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.amount * item.quantity;
    message += `${index + 1}. ${item.name}\n`;
    message += `   Description: ${item.description}\n`;
    message += `   Qty: ${item.quantity} × ₦${item.amount.toLocaleString()} = ₦${itemTotal.toLocaleString()}\n\n`;
  });
  
  message += `*TOTAL: ₦${totalSum.toLocaleString()}*\n\n`;
  
  message += `*DELIVERY ADDRESS:*\n${deliveryAddress || 'Not specified'}\n\n`;
  
  message += `We appreciate your business and hope you enjoy your purchase!\n`;
  message += `- The Kasuwa Mall Team 🛍️`;
  
  return message;
};