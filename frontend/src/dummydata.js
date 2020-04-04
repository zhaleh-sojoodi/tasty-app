let user = {
  name: "Jane Doe",
  image:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  bio:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum provident voluptatibus aperiam amet quisquam, voluptate soluta molestias, maiores totam saepe, natus rerum facere. Doloribus distinctio fugit autem, quas ipsa veritatis!",
};

var mostPopular = [
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
];
  
  var highestRated = [
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Healthy Pesto Pasta",
      description:
        "Rich and creamy pesto pasta with tomatoes, whole wheat noodles, bright pesto, and greek yogurt. Super creamy and rich pesto sauce made with protein-packed greek yogurt! So amazing you'll ditch store-bought versions for good!",
      difficulty: "Easy",
      cookingTime: 10,
      preparationTime: 20,
      servings: 2,
      category: "Dinner",
      ingredients: [
        "1 bag whole wheat pasta",
        "1 cup sliced spinach",
        "3 tomatoes",
        "3/4 cup plain greek yogurt",
        "1 jar (7 oz) genovese pesto",
        "Extra virgin olive oil, to taste",
      ],
      steps: [
        "Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Stir in chicken broth, milk and fettuccine; season with salt and pepper, to taste.",
        "Bring to a boil; reduce heat and simmer, stirring occasionally, until pasta is cooked through, about 18-20 minutes. Stir in Parmesan. If the mixture is too thick, add more milk as needed until desired consistency is reached.",
        "Serve immediately, garnished with parsley, if desired.",
      ],
      ratings: {
        averageRating: 4.5,
        ratings: [
          {
            user: "UserId1",
            rating: 4,
          },
          {
            user: "UserId2",
            rating: 5,
          },
        ],
      },
      likes: [
        {
          user: "UserId1",
        },
        {
          user: "UserId2",
        },
      ],
      addedDate: Date.now,
      creator: "UserId1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
];

export { user, mostPopular, highestRated };