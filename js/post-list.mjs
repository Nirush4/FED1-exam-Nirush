const posts = [
  {
    title: "Capturing the World: A Beginner's Photography Guide to Traveling",
    body: `Travel photography is not just a pastime — it is a way of recording the world, of keeping memories, and of sharing the loveliness of varied cultures, landscapes, and moments with other people. Whether strolling down congested city sidewalks, hiking picturesque mountains, or wandering in a far-off village, the world is full of avenues to take stunning photos. In this post, I will share some tricks and tips on how to capture great travel shots, along with a few of my own personal favorites from my recent adventures.

1. The Best Gear for Travel Photography
When you're traveling, you need the proper gear. But you don't have to carry a large, heavy camera bag full of equipment to get good shots. Here are some of my favorite travel gear:
 
Camera: A mirrorless or DSLR is the best for versatility, but even a good point-and-shoot or phone camera can capture incredible shots. My go-to travel camera is the Canon EOS R5, which offers a great combination of portability, image quality, and battery life.
 `,
    tags: ['Photography, beginner'],
    media: {
      url: 'https://images.unsplash.com/photo-1641463789150-9d8a474ed1b7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'A girl taking a photo with a camera, focused on capturing the scene in front of him.',
    },
  },
  {
    title: "Capturing the World: A Beginner's Photography Guide to Traveling",
    body: 'Travel photography is not just a pastime — it is a way of recording the world, of keeping memories, and of sharing the loveliness of varied cultures, landscapes, and moments with other people. Whether strolling down congested city sidewalks, hiking picturesque mountains, or wandering in a far-off village, the world is full of avenues to take stunning photos. In this post, I will share some tricks and tips on how to capture great travel shots, along with a few of my own personal favorites from my recent adventures.',
    tags: ['camera', 'Photography'],
    media: {
      url: 'https://images.unsplash.com/photo-1641463789150-9d8a474ed1b7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'A girl taking a photo with a camera, focused on capturing the scene in front of her.',
    },
  },
  {
    title: 'How to Capture Stunning Sunrise and Sunset Photos While Traveling',
    body: `There’s something universally magical about a sunrise or sunset — the colors, the mood, the quiet transition between day and night. When you're traveling, these golden moments become even more precious, offering a unique way to capture the soul of a place. But getting that perfect shot? It takes more than just pointing your camera at the sky.

In this post, we’ll walk you through the tips, techniques, and tools you need to consistently capture stunning sunrise and sunset photos on the road.`,
    tags: ['Photography, sunrise', 'sunset'],
    media: {
      url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Golden sunrise over a mountain landscape with soft light illuminating the sky and foreground',
    },
  },
  {
    title:
      'The Ultimate Gear Guide for Travel Photographers: What You Really Need',
    body: 'Travel photography is not just a pastime — it is a way of recording the world, of keeping memories, and of sharing the loveliness of varied cultures, landscapes, and moments with other people. Whether strolling down congested city sidewalks, hiking picturesque mountains, or wandering in a far-off village, the world is full of avenues to take stunning photos. In this post, I will share some tricks and tips on how to capture great travel shots, along with a few of my own personal favorites from my recent adventures.',
    tags: ['camera', 'travel', 'Photography'],
    media: {
      url: 'https://images.unsplash.com/photo-1741377772075-5f0f0d21d6b4?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Flat lay of travel photography gear including camera, lenses, tripod, memory cards, and backpack on wooden surface',
    },
  },
];

posts.forEach((post) => {
  fetch(`https://v2.api.noroff.dev/blog/posts/Nirush/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => console.log('Post created:', data))
    .catch((err) => console.error('Error:', err));
});
