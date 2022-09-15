

function quotesList() {
    const quotes = [
        {
            "q": "No one has ever become poor by giving.",
            "a": "Anne Frank",
            "c": "38",
            "h": "<blockquote>&ldquo;No one has ever become poor by giving.&rdquo; &mdash; <footer>Anne Frank</footer></blockquote>"
        },
        {
            "q": "There are as many opinions as there are experts.",
            "a": "Franklin D. Roosevelt",
            "c": "48",
            "h": "<blockquote>&ldquo;There are as many opinions as there are experts.&rdquo; &mdash; <footer>Franklin D. Roosevelt</footer></blockquote>"
        },
        {
            "q": "Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more. ",
            "a": "Nikola Tesla",
            "c": "105",
            "h": "<blockquote>&ldquo;Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more. &rdquo; &mdash; <footer>Nikola Tesla</footer></blockquote>"
        },
        {
            "q": "Blessed is he who expects nothing, for he shall never be disappointed.",
            "a": "Alexander Pope",
            "c": "70",
            "h": "<blockquote>&ldquo;Blessed is he who expects nothing, for he shall never be disappointed.&rdquo; &mdash; <footer>Alexander Pope</footer></blockquote>"
        },
        {
            "q": "Enthusiasm makes up for a host of deficiencies.",
            "a": "Barack Obama",
            "c": "47",
            "h": "<blockquote>&ldquo;Enthusiasm makes up for a host of deficiencies.&rdquo; &mdash; <footer>Barack Obama</footer></blockquote>"
        },
        {
            "q": "One of the keys to happiness is a bad memory.",
            "a": "Rita Mae Brown",
            "c": "45",
            "h": "<blockquote>&ldquo;One of the keys to happiness is a bad memory.&rdquo; &mdash; <footer>Rita Mae Brown</footer></blockquote>"
        },
        {
            "q": "He who can no longer pause to wonder and stand rapt in awe, is as good as dead; his eyes are closed. ",
            "a": "Albert Einstein",
            "c": "101",
            "h": "<blockquote>&ldquo;He who can no longer pause to wonder and stand rapt in awe, is as good as dead; his eyes are closed. &rdquo; &mdash; <footer>Albert Einstein</footer></blockquote>"
        },
        {
            "q": "Imagination is more important than knowledge.",
            "a": "Albert Einstein",
            "c": "45",
            "h": "<blockquote>&ldquo;Imagination is more important than knowledge.&rdquo; &mdash; <footer>Albert Einstein</footer></blockquote>"
        },
        {
            "q": "We win by helping each other win.",
            "a": "Jack Butcher",
            "c": "33",
            "h": "<blockquote>&ldquo;We win by helping each other win.&rdquo; &mdash; <footer>Jack Butcher</footer></blockquote>"
        },
        {
            "q": "Some of your greatest lessons come from your darkest moments.",
            "a": "Roger Lee",
            "c": "61",
            "h": "<blockquote>&ldquo;Some of your greatest lessons come from your darkest moments.&rdquo; &mdash; <footer>Roger Lee</footer></blockquote>"
        },
        {
            "q": "Don´t hesitate or allow yourself to make excuses. Just get out and do it.",
            "a": "Christopher McCandless",
            "c": "74",
            "h": "<blockquote>&ldquo;Don´t hesitate or allow yourself to make excuses. Just get out and do it.&rdquo; &mdash; <footer>Christopher McCandless</footer></blockquote>"
        },
        {
            "q": "Great things are not done by impulse, but by a series of small things brought together.",
            "a": "Vincent van Gogh",
            "c": "87",
            "h": "<blockquote>&ldquo;Great things are not done by impulse, but by a series of small things brought together.&rdquo; &mdash; <footer>Vincent van Gogh</footer></blockquote>"
        },
        {
            "q": "Life is a journey, not a destination.",
            "a": "Dan Millman",
            "c": "37",
            "h": "<blockquote>&ldquo;Life is a journey, not a destination.&rdquo; &mdash; <footer>Dan Millman</footer></blockquote>"
        },
        {
            "q": "Do not think you will necessarily be aware of your own enlightenment.",
            "a": "Dogen",
            "c": "69",
            "h": "<blockquote>&ldquo;Do not think you will necessarily be aware of your own enlightenment.&rdquo; &mdash; <footer>Dogen</footer></blockquote>"
        },
        {
            "q": "Yesterday is the past, tomorrow is the future, today is a gift - that's why it's called the present.",
            "a": "George Bernard Shaw",
            "c": "100",
            "h": "<blockquote>&ldquo;Yesterday is the past, tomorrow is the future, today is a gift - that's why it's called the present.&rdquo; &mdash; <footer>George Bernard Shaw</footer></blockquote>"
        },
        {
            "q": "Don't be afraid that you do not know something. Be afraid of not learning about it.",
            "a": "Zen Proverb",
            "c": "83",
            "h": "<blockquote>&ldquo;Don't be afraid that you do not know something. Be afraid of not learning about it.&rdquo; &mdash; <footer>Zen Proverb</footer></blockquote>"
        },
        {
            "q": "You do not read a book for the book's sake, but for your own.",
            "a": "Earl Nightingale",
            "c": "61",
            "h": "<blockquote>&ldquo;You do not read a book for the book's sake, but for your own.&rdquo; &mdash; <footer>Earl Nightingale</footer></blockquote>"
        },
        {
            "q": "The world is a puzzle; no need to make sense out of it.",
            "a": "Socrates",
            "c": "55",
            "h": "<blockquote>&ldquo;The world is a puzzle; no need to make sense out of it.&rdquo; &mdash; <footer>Socrates</footer></blockquote>"
        },
        {
            "q": "The friendship that can cease has never been real. ",
            "a": "St. Jerome",
            "c": "51",
            "h": "<blockquote>&ldquo;The friendship that can cease has never been real. &rdquo; &mdash; <footer>St. Jerome</footer></blockquote>"
        },
        {
            "q": "Often in the real world, it's not the smart that get ahead, but the bold.",
            "a": "Robert Kiyosaki",
            "c": "73",
            "h": "<blockquote>&ldquo;Often in the real world, it's not the smart that get ahead, but the bold.&rdquo; &mdash; <footer>Robert Kiyosaki</footer></blockquote>"
        },
        {
            "q": "Courage Is a Love Affair with the Unknown",
            "a": "Osho",
            "c": "41",
            "h": "<blockquote>&ldquo;Courage Is a Love Affair with the Unknown&rdquo; &mdash; <footer>Osho</footer></blockquote>"
        },
        {
            "q": "Welcome every morning with a smile. Look on the new day as another gift from your Creator, another golden opportunity.",
            "a": "Og Mandino",
            "c": "118",
            "h": "<blockquote>&ldquo;Welcome every morning with a smile. Look on the new day as another gift from your Creator, another golden opportunity.&rdquo; &mdash; <footer>Og Mandino</footer></blockquote>"
        },
        {
            "q": "Who you are is always right.",
            "a": "Ming-Dao Deng",
            "c": "28",
            "h": "<blockquote>&ldquo;Who you are is always right.&rdquo; &mdash; <footer>Ming-Dao Deng</footer></blockquote>"
        },
        {
            "q": "Why fit in when you were born to stand out?",
            "a": "Dr. Seuss",
            "c": "43",
            "h": "<blockquote>&ldquo;Why fit in when you were born to stand out?&rdquo; &mdash; <footer>Dr. Seuss</footer></blockquote>"
        },
        {
            "q": "You are the only problem you will ever have and you are the only solution.",
            "a": "Bob Proctor",
            "c": "74",
            "h": "<blockquote>&ldquo;You are the only problem you will ever have and you are the only solution.&rdquo; &mdash; <footer>Bob Proctor</footer></blockquote>"
        },
        {
            "q": "Successful people do what unsuccessful people are not willing to do.",
            "a": "Jim Rohn",
            "c": "68",
            "h": "<blockquote>&ldquo;Successful people do what unsuccessful people are not willing to do.&rdquo; &mdash; <footer>Jim Rohn</footer></blockquote>"
        },
        {
            "q": "From error to error one discovers the entire truth.",
            "a": "Sigmund Freud",
            "c": "51",
            "h": "<blockquote>&ldquo;From error to error one discovers the entire truth.&rdquo; &mdash; <footer>Sigmund Freud</footer></blockquote>"
        },
        {
            "q": "Patience is bitter, but its fruit is sweet.",
            "a": "Aristotle",
            "c": "43",
            "h": "<blockquote>&ldquo;Patience is bitter, but its fruit is sweet.&rdquo; &mdash; <footer>Aristotle</footer></blockquote>"
        },
        {
            "q": "Winners don't Quit. That's why they Win.",
            "a": "Unknown",
            "c": "40",
            "h": "<blockquote>&ldquo;Winners don't Quit. That's why they Win.&rdquo; &mdash; <footer>Unknown</footer></blockquote>"
        },
        {
            "q": "Death smiles at us all. All we can do is smile back.",
            "a": "Marcus Aurelius",
            "c": "52",
            "h": "<blockquote>&ldquo;Death smiles at us all. All we can do is smile back.&rdquo; &mdash; <footer>Marcus Aurelius</footer></blockquote>"
        },
        {
            "q": "Even when you think you have your life all mapped out, things happen that shape your destiny in ways you might never have imagined.",
            "a": "Deepak Chopra",
            "c": "131",
            "h": "<blockquote>&ldquo;Even when you think you have your life all mapped out, things happen that shape your destiny in ways you might never have imagined.&rdquo; &mdash; <footer>Deepak Chopra</footer></blockquote>"
        },
        {
            "q": "We think too much and feel too little.",
            "a": "Charlie Chaplin",
            "c": "38",
            "h": "<blockquote>&ldquo;We think too much and feel too little.&rdquo; &mdash; <footer>Charlie Chaplin</footer></blockquote>"
        },
        {
            "q": "When the mind is calm, how quickly, how smoothly, how beautifully you will perceive everything.",
            "a": "Paramahansa Yogananda",
            "c": "95",
            "h": "<blockquote>&ldquo;When the mind is calm, how quickly, how smoothly, how beautifully you will perceive everything.&rdquo; &mdash; <footer>Paramahansa Yogananda</footer></blockquote>"
        },
        {
            "q": "Life has no limitations except the ones you make.",
            "a": "Les Brown",
            "c": "49",
            "h": "<blockquote>&ldquo;Life has no limitations except the ones you make.&rdquo; &mdash; <footer>Les Brown</footer></blockquote>"
        },
        {
            "q": "Success comes from knowing that you did your best to become the best that you are capable of becoming.",
            "a": "John Wooden",
            "c": "102",
            "h": "<blockquote>&ldquo;Success comes from knowing that you did your best to become the best that you are capable of becoming.&rdquo; &mdash; <footer>John Wooden</footer></blockquote>"
        },
        {
            "q": "If you focus on success, you'll have stress. But if you pursue excellence, success will be guaranteed.",
            "a": "Deepak Chopra",
            "c": "102",
            "h": "<blockquote>&ldquo;If you focus on success, you'll have stress. But if you pursue excellence, success will be guaranteed.&rdquo; &mdash; <footer>Deepak Chopra</footer></blockquote>"
        },
        {
            "q": "Don't look back - you're not going that way.",
            "a": "Mary Engelbreit",
            "c": "44",
            "h": "<blockquote>&ldquo;Don't look back - you're not going that way.&rdquo; &mdash; <footer>Mary Engelbreit</footer></blockquote>"
        },
        {
            "q": "Troubles are often the tools by which God fashions us for better things.",
            "a": "Henry Ward Beecher",
            "c": "72",
            "h": "<blockquote>&ldquo;Troubles are often the tools by which God fashions us for better things.&rdquo; &mdash; <footer>Henry Ward Beecher</footer></blockquote>"
        },
        {
            "q": "Things turn out best for the people who make the best of the way things turn out.",
            "a": "John Wooden",
            "c": "81",
            "h": "<blockquote>&ldquo;Things turn out best for the people who make the best of the way things turn out.&rdquo; &mdash; <footer>John Wooden</footer></blockquote>"
        },
        {
            "q": "Give a girl the right shoes, and she can conquer the world.",
            "a": "Bette Midler",
            "c": "59",
            "h": "<blockquote>&ldquo;Give a girl the right shoes, and she can conquer the world.&rdquo; &mdash; <footer>Bette Midler</footer></blockquote>"
        },
        {
            "q": "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
            "a": "Albus Dumbledore",
            "c": "105",
            "h": "<blockquote>&ldquo;It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.&rdquo; &mdash; <footer>Albus Dumbledore</footer></blockquote>"
        },
        {
            "q": "There is always room in your life for thinking bigger, pushing limits and imagining the impossible.",
            "a": "Tony Robbins",
            "c": "99",
            "h": "<blockquote>&ldquo;There is always room in your life for thinking bigger, pushing limits and imagining the impossible.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>"
        },
        {
            "q": "Your problem isn't the problem. Your reaction is the problem.",
            "a": "Unknown",
            "c": "61",
            "h": "<blockquote>&ldquo;Your problem isn't the problem. Your reaction is the problem.&rdquo; &mdash; <footer>Unknown</footer></blockquote>"
        },
        {
            "q": "Always try to be a little kinder than necessary.",
            "a": "James Matthew Barrie",
            "c": "48",
            "h": "<blockquote>&ldquo;Always try to be a little kinder than necessary.&rdquo; &mdash; <footer>James Matthew Barrie</footer></blockquote>"
        },
        {
            "q": "It's easier to lose than to win.  ",
            "a": "Wayne Gretzky",
            "c": "34",
            "h": "<blockquote>&ldquo;It's easier to lose than to win.  &rdquo; &mdash; <footer>Wayne Gretzky</footer></blockquote>"
        },
        {
            "q": "You need to be doing fewer things for more effect instead of doing more things with side effects.",
            "a": "Gary Keller",
            "c": "97",
            "h": "<blockquote>&ldquo;You need to be doing fewer things for more effect instead of doing more things with side effects.&rdquo; &mdash; <footer>Gary Keller</footer></blockquote>"
        },
        {
            "q": "Be of good cheer about death, and know this of a truth, that no evil can happen to a good man, either in life or after death.",
            "a": "Socrates",
            "c": "125",
            "h": "<blockquote>&ldquo;Be of good cheer about death, and know this of a truth, that no evil can happen to a good man, either in life or after death.&rdquo; &mdash; <footer>Socrates</footer></blockquote>"
        },
        {
            "q": "The deeper the truth in a creative work, the longer it will live.  ",
            "a": "Charlie Chaplin",
            "c": "67",
            "h": "<blockquote>&ldquo;The deeper the truth in a creative work, the longer it will live.  &rdquo; &mdash; <footer>Charlie Chaplin</footer></blockquote>"
        },
        {
            "q": "It's not how much money you make, it's how much money you keep.",
            "a": "Robert Kiyosaki",
            "c": "63",
            "h": "<blockquote>&ldquo;It's not how much money you make, it's how much money you keep.&rdquo; &mdash; <footer>Robert Kiyosaki</footer></blockquote>"
        },
        {
            "q": "Go confidently in the direction of your dreams. Live the life you've imagined.",
            "a": "Arnold Schwarzenegger",
            "c": "78",
            "h": "<blockquote>&ldquo;Go confidently in the direction of your dreams. Live the life you've imagined.&rdquo; &mdash; <footer>Arnold Schwarzenegger</footer></blockquote>"
        },
        {
            "q": "The best answer to anger is silence.",
            "a": "Marcus Aurelius",
            "c": "36",
            "h": "<blockquote>&ldquo;The best answer to anger is silence.&rdquo; &mdash; <footer>Marcus Aurelius</footer></blockquote>"
        },
        {
            "q": "The journey is what brings us happiness not the destination.",
            "a": "Dan Millman",
            "c": "60",
            "h": "<blockquote>&ldquo;The journey is what brings us happiness not the destination.&rdquo; &mdash; <footer>Dan Millman</footer></blockquote>"
        },
        {
            "q": "Nothing is too high for a man to reach, but he must climb with care and confidence",
            "a": "Hans Christian Andersen",
            "c": "82",
            "h": "<blockquote>&ldquo;Nothing is too high for a man to reach, but he must climb with care and confidence&rdquo; &mdash; <footer>Hans Christian Andersen</footer></blockquote>"
        },
        {
            "q": "If you don't have time to do it right, when will you have time to do it over?",
            "a": "John Wooden",
            "c": "77",
            "h": "<blockquote>&ldquo;If you don't have time to do it right, when will you have time to do it over?&rdquo; &mdash; <footer>John Wooden</footer></blockquote>"
        },
        {
            "q": "Opportunity often comes disguised in the form of misfortune or temporary defeat.",
            "a": "Napoleon Hill",
            "c": "80",
            "h": "<blockquote>&ldquo;Opportunity often comes disguised in the form of misfortune or temporary defeat.&rdquo; &mdash; <footer>Napoleon Hill</footer></blockquote>"
        },
        {
            "q": "The impossible can always be broken down into possibilities.",
            "a": "Unknown",
            "c": "60",
            "h": "<blockquote>&ldquo;The impossible can always be broken down into possibilities.&rdquo; &mdash; <footer>Unknown</footer></blockquote>"
        },
        {
            "q": "You don't have to be great to start, but you have to start to be great.  ",
            "a": "Zig Ziglar",
            "c": "73",
            "h": "<blockquote>&ldquo;You don't have to be great to start, but you have to start to be great.  &rdquo; &mdash; <footer>Zig Ziglar</footer></blockquote>"
        },
        {
            "q": "To wish you were someone else is to waste the person you are.",
            "a": "Unknown",
            "c": "61",
            "h": "<blockquote>&ldquo;To wish you were someone else is to waste the person you are.&rdquo; &mdash; <footer>Unknown</footer></blockquote>"
        },
        {
            "q": "Someone who points out your flaws to you is not necessarily your enemy. Someone who speaks of your virtues is not necessarily your friend.",
            "a": "Zen Proverb",
            "c": "138",
            "h": "<blockquote>&ldquo;Someone who points out your flaws to you is not necessarily your enemy. Someone who speaks of your virtues is not necessarily your friend.&rdquo; &mdash; <footer>Zen Proverb</footer></blockquote>"
        },
        {
            "q": "Any game becomes important when you know and love the players.",
            "a": "W.P. Kinsella",
            "c": "62",
            "h": "<blockquote>&ldquo;Any game becomes important when you know and love the players.&rdquo; &mdash; <footer>W.P. Kinsella</footer></blockquote>"
        },
        {
            "q": "Nothing has more strength than dire necessity.",
            "a": "Euripides",
            "c": "46",
            "h": "<blockquote>&ldquo;Nothing has more strength than dire necessity.&rdquo; &mdash; <footer>Euripides</footer></blockquote>"
        },
        {
            "q": "Silence is a source of great strength.",
            "a": "Lao Tzu",
            "c": "38",
            "h": "<blockquote>&ldquo;Silence is a source of great strength.&rdquo; &mdash; <footer>Lao Tzu</footer></blockquote>"
        },
        {
            "q": "Sometimes a change of perspective is all it takes to see the light.",
            "a": "Dan Brown",
            "c": "67",
            "h": "<blockquote>&ldquo;Sometimes a change of perspective is all it takes to see the light.&rdquo; &mdash; <footer>Dan Brown</footer></blockquote>"
        },
        {
            "q": "Love is the expression of one's values.",
            "a": "Ayn Rand",
            "c": "39",
            "h": "<blockquote>&ldquo;Love is the expression of one's values.&rdquo; &mdash; <footer>Ayn Rand</footer></blockquote>"
        },
        {
            "q": "Hope means hoping when everything seems hopeless.",
            "a": "Gilbert Chesterton",
            "c": "49",
            "h": "<blockquote>&ldquo;Hope means hoping when everything seems hopeless.&rdquo; &mdash; <footer>Gilbert Chesterton</footer></blockquote>"
        },
        {
            "q": "If you tell the truth, you don't have to remember anything.",
            "a": "Mark Twain",
            "c": "59",
            "h": "<blockquote>&ldquo;If you tell the truth, you don't have to remember anything.&rdquo; &mdash; <footer>Mark Twain</footer></blockquote>"
        },
        {
            "q": "Be the silent watcher of your thoughts and behavior. You are beneath the thinker.",
            "a": "Eckhart Tolle",
            "c": "81",
            "h": "<blockquote>&ldquo;Be the silent watcher of your thoughts and behavior. You are beneath the thinker.&rdquo; &mdash; <footer>Eckhart Tolle</footer></blockquote>"
        },
        {
            "q": "In spite of everything, I shall rise again.",
            "a": "Vincent van Gogh",
            "c": "43",
            "h": "<blockquote>&ldquo;In spite of everything, I shall rise again.&rdquo; &mdash; <footer>Vincent van Gogh</footer></blockquote>"
        },
        {
            "q": "Extraordinary results happen only when you give the best you have to become the best you can be at your most important work.",
            "a": "Gary Keller",
            "c": "124",
            "h": "<blockquote>&ldquo;Extraordinary results happen only when you give the best you have to become the best you can be at your most important work.&rdquo; &mdash; <footer>Gary Keller</footer></blockquote>"
        },
        {
            "q": "My guiding principle is this: Guilt is never to be doubted. ",
            "a": "Franz Kafka",
            "c": "60",
            "h": "<blockquote>&ldquo;My guiding principle is this: Guilt is never to be doubted. &rdquo; &mdash; <footer>Franz Kafka</footer></blockquote>"
        },
        {
            "q": "Here is the test to find whether your mission on earth is finished. If you're alive, it isn't.",
            "a": "Richard Bach",
            "c": "94",
            "h": "<blockquote>&ldquo;Here is the test to find whether your mission on earth is finished. If you're alive, it isn't.&rdquo; &mdash; <footer>Richard Bach</footer></blockquote>"
        },
        {
            "q": "The heart that gives, gathers.",
            "a": "Lao Tzu",
            "c": "30",
            "h": "<blockquote>&ldquo;The heart that gives, gathers.&rdquo; &mdash; <footer>Lao Tzu</footer></blockquote>"
        },
        {
            "q": "Where there is no struggle, there is no strength. ",
            "a": "Oprah Winfrey",
            "c": "50",
            "h": "<blockquote>&ldquo;Where there is no struggle, there is no strength. &rdquo; &mdash; <footer>Oprah Winfrey</footer></blockquote>"
        },
        {
            "q": "There is no self-discovery without pain and loss.",
            "a": "Anita Krizzan",
            "c": "49",
            "h": "<blockquote>&ldquo;There is no self-discovery without pain and loss.&rdquo; &mdash; <footer>Anita Krizzan</footer></blockquote>"
        },
        {
            "q": "Every day passes whether you participate or not.",
            "a": "Ming-Dao Deng",
            "c": "48",
            "h": "<blockquote>&ldquo;Every day passes whether you participate or not.&rdquo; &mdash; <footer>Ming-Dao Deng</footer></blockquote>"
        },
        {
            "q": "Definitions belong to the definers, not the defined.",
            "a": "Toni Morrison",
            "c": "52",
            "h": "<blockquote>&ldquo;Definitions belong to the definers, not the defined.&rdquo; &mdash; <footer>Toni Morrison</footer></blockquote>"
        },
        {
            "q": "Be fascinated instead of frustrated.",
            "a": "Jim Rohn",
            "c": "36",
            "h": "<blockquote>&ldquo;Be fascinated instead of frustrated.&rdquo; &mdash; <footer>Jim Rohn</footer></blockquote>"
        },
        {
            "q": "Don't cry because it's over. Smile because it happened.",
            "a": "Dr. Seuss",
            "c": "55",
            "h": "<blockquote>&ldquo;Don't cry because it's over. Smile because it happened.&rdquo; &mdash; <footer>Dr. Seuss</footer></blockquote>"
        },
        {
            "q": "When you are tough on yourself, life is going to be infinitely easier on you.  ",
            "a": "Zig Ziglar",
            "c": "79",
            "h": "<blockquote>&ldquo;When you are tough on yourself, life is going to be infinitely easier on you.  &rdquo; &mdash; <footer>Zig Ziglar</footer></blockquote>"
        },
        {
            "q": "You will never do anything in this world without courage. It is the greatest quality of the mind next to honor.",
            "a": "James Allen",
            "c": "111",
            "h": "<blockquote>&ldquo;You will never do anything in this world without courage. It is the greatest quality of the mind next to honor.&rdquo; &mdash; <footer>James Allen</footer></blockquote>"
        },
        {
            "q": "Do what you can, with what you have, where you are.",
            "a": "Theodore Roosevelt",
            "c": "51",
            "h": "<blockquote>&ldquo;Do what you can, with what you have, where you are.&rdquo; &mdash; <footer>Theodore Roosevelt</footer></blockquote>"
        },
        {
            "q": "What keeps life fascinating is the constant creativity of the soul.",
            "a": "Deepak Chopra",
            "c": "67",
            "h": "<blockquote>&ldquo;What keeps life fascinating is the constant creativity of the soul.&rdquo; &mdash; <footer>Deepak Chopra</footer></blockquote>"
        },
        {
            "q": "There is no right or wrong, only a series of possibilities that shift with each thought, feeling, and action that you experience.",
            "a": "Deepak Chopra",
            "c": "129",
            "h": "<blockquote>&ldquo;There is no right or wrong, only a series of possibilities that shift with each thought, feeling, and action that you experience.&rdquo; &mdash; <footer>Deepak Chopra</footer></blockquote>"
        },
        {
            "q": "All our dreams can come true, if we have the courage to pursue them.",
            "a": "Walt Disney",
            "c": "68",
            "h": "<blockquote>&ldquo;All our dreams can come true, if we have the courage to pursue them.&rdquo; &mdash; <footer>Walt Disney</footer></blockquote>"
        },
        {
            "q": "But better die than live mechanically a life that is a repetition of repetitions.",
            "a": "D. H. Lawrence",
            "c": "81",
            "h": "<blockquote>&ldquo;But better die than live mechanically a life that is a repetition of repetitions.&rdquo; &mdash; <footer>D. H. Lawrence</footer></blockquote>"
        },
        {
            "q": "The quieter you become, the more you are able to hear.",
            "a": "Rumi",
            "c": "54",
            "h": "<blockquote>&ldquo;The quieter you become, the more you are able to hear.&rdquo; &mdash; <footer>Rumi</footer></blockquote>"
        },
        {
            "q": "If you can see it in your mind, you can hold it in your mind.",
            "a": "Steve Harvey",
            "c": "61",
            "h": "<blockquote>&ldquo;If you can see it in your mind, you can hold it in your mind.&rdquo; &mdash; <footer>Steve Harvey</footer></blockquote>"
        },
        {
            "q": "What we know is a drop, what we don't know is an ocean. ",
            "a": "Isaac Newton",
            "c": "56",
            "h": "<blockquote>&ldquo;What we know is a drop, what we don't know is an ocean. &rdquo; &mdash; <footer>Isaac Newton</footer></blockquote>"
        },
        {
            "q": "No problem can be solved from the same level of consciousness that created it.",
            "a": "Albert Einstein",
            "c": "78",
            "h": "<blockquote>&ldquo;No problem can be solved from the same level of consciousness that created it.&rdquo; &mdash; <footer>Albert Einstein</footer></blockquote>"
        },
        {
            "q": "Good judgment comes from experience, and experience comes from bad judgment.",
            "a": "Rita Mae Brown",
            "c": "76",
            "h": "<blockquote>&ldquo;Good judgment comes from experience, and experience comes from bad judgment.&rdquo; &mdash; <footer>Rita Mae Brown</footer></blockquote>"
        },
        {
            "q": "We build too many walls and not enough bridges.",
            "a": "Isaac Newton",
            "c": "47",
            "h": "<blockquote>&ldquo;We build too many walls and not enough bridges.&rdquo; &mdash; <footer>Isaac Newton</footer></blockquote>"
        },
        {
            "q": "Great ones are willing to get burned time and again as they sharpen their swords in the fire.",
            "a": "Josh Waitzkin",
            "c": "93",
            "h": "<blockquote>&ldquo;Great ones are willing to get burned time and again as they sharpen their swords in the fire.&rdquo; &mdash; <footer>Josh Waitzkin</footer></blockquote>"
        },
        {
            "q": "You get paid in direct proportion to the difficulty of problems you solve.",
            "a": "Elon Musk",
            "c": "74",
            "h": "<blockquote>&ldquo;You get paid in direct proportion to the difficulty of problems you solve.&rdquo; &mdash; <footer>Elon Musk</footer></blockquote>"
        },
        {
            "q": "Seek not the good in external things;seek it in yourselves.",
            "a": "Epictetus",
            "c": "59",
            "h": "<blockquote>&ldquo;Seek not the good in external things;seek it in yourselves.&rdquo; &mdash; <footer>Epictetus</footer></blockquote>"
        },
        {
            "q": "Life is not a problem to be solved, but a reality to be experienced.",
            "a": "Soren Kierkegaard",
            "c": "68",
            "h": "<blockquote>&ldquo;Life is not a problem to be solved, but a reality to be experienced.&rdquo; &mdash; <footer>Soren Kierkegaard</footer></blockquote>"
        },
        {
            "q": "The highest level of wisdom is when you not only accept but love adversity.",
            "a": "Maxime Lagace",
            "c": "75",
            "h": "<blockquote>&ldquo;The highest level of wisdom is when you not only accept but love adversity.&rdquo; &mdash; <footer>Maxime Lagace</footer></blockquote>"
        }
        ]

    return (
        quotes
    )
}

export default quotesList