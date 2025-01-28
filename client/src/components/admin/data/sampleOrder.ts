export const sampleOrders = [
    {
      id: 'ORD001',
      items: [
        {
          menuItem: {
            id: '1',
            name: 'Classic Margherita Pizza',
            price: 14.99,
            description: 'Fresh mozzarella, tomatoes, and basil on a crispy crust',
            image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
            category: 'Pizza'
          },
          quantity: 2
        }
      ],
      status: 'pending',
      totalAmount: 29.98,
      customerName: 'John Doe',
      timestamp: new Date(),
      paymentStatus: 'completed'
    },
    {
      id: 'ORD002',
      items: [
        {
          menuItem: {
            id: '2',
            name: 'Grilled Salmon Bowl',
            price: 18.99,
            description: 'Fresh grilled salmon with quinoa, avocado, and vegetables',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
            category: 'Mains'
          },
          quantity: 1
        }
      ],
      status: 'pending',
      totalAmount: 18.99,
      customerName: 'Jane Smith',
      timestamp: new Date(),
      paymentStatus: 'pending'
    }
  ] as const;