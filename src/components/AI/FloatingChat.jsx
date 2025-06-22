
import { useState, useEffect, useRef } from 'react';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('AIzaSyBkIAgT8SBMwpitI-rOM-jrBLnCn2KTxf8');

  const messagesEndRef = useRef(null);

  // Comprehensive product database in Kinyarwanda with food and agriculture products
  const products = {
    'ibinyabuzima': {
      name: 'Ibinyabuzima (Livestock)',
      items: [
        { name: 'Intama', price: '250,000 RWF', description: 'Intama nziza zo kuruga n\'inyama, zibyara buri kwezi 5' },
        { name: 'Inka', price: '800,000 RWF', description: 'Inka z\'amata menshi (15-20L/umunsi) n\'inyama nyinshi' },
        { name: 'Inkoko', price: '15,000 RWF', description: 'Inkoko z\'amagi menshi (250-300 amagi/umwaka) n\'inyama' },
        { name: 'Ihene', price: '180,000 RWF', description: 'Ihene z\'amata meza (3-5L/umunsi) n\'inyama' },
        { name: 'Ingurube', price: '120,000 RWF', description: 'Ingurube z\'inyama nyinshi, zikura vuba' },
        { name: 'Imbabazi', price: '8,000 RWF', description: 'Imbabazi z\'amagi n\'inyama, zororoka' },
        { name: 'Amafi (Tilapia)', price: '4,500 RWF/kg', description: 'Amafi meza yo kurya, kandi afite proteine nyinshi' },
        { name: 'Ubuki', price: '12,000 RWF/kg', description: 'Ubuki kamere bwiza bwo kubana indwara' }
      ]
    },
    'imbuto_n_ibinyampeke': {
      name: 'Imbuto n\'Ibinyampeke (Seeds & Grains)',
      items: [
        { name: 'Imbuto z\'umuceri', price: '3,500 RWF/kg', description: 'Imbuto z\'umuceri mwiza wo kurya, zibyara menshi' },
        { name: 'Imbuto z\'ibigori', price: '2,200 RWF/kg', description: 'Ibigori byiza byo kurima no kurya, byihangana imvura' },
        { name: 'Imbuto z\'ubunyebuye', price: '1,800 RWF/kg', description: 'Ubunyebuye bwiza bwo kurya, bwihangana ubushuhe' },
        { name: 'Imbuto z\'ibinyebwa', price: '4,200 RWF/kg', description: 'Ibinyebwa byiza byo kurya, bifite vitamini nyinshi' },
        { name: 'Imbuto z\'ubushuhe', price: '3,800 RWF/kg', description: 'Ubushuhe bwiza bwo kurya, bwihangana ubushuhe' },
        { name: 'Imbuto z\'ibishyimbo', price: '2,800 RWF/kg', description: 'Ibishyimbo byiza byo kurya, bifite proteine nyinshi' },
        { name: 'Imbuto z\'amaru', price: '5,200 RWF/kg', description: 'Amaru meza yo kurya, afite amavuta meza' },
        { name: 'Imbuto z\'ibigikoma', price: '1,500 RWF/kg', description: 'Ibigikoma byiza byo kurya, byoroshye guteka' },
        { name: 'Imbuto z\'umukunde', price: '6,800 RWF/kg', description: 'Umukunde mwiza wo kurya, uhangana ubushuhe' }
      ]
    },
    'imboga_n_imbuto_zimboga': {
      name: 'Imboga n\'Imbuto z\'Imboga (Vegetables & Vegetable Seeds)',
      items: [
        { name: 'Imbuto z\'amanyanya', price: '8,500 RWF/kg', description: 'Amanyanya meza yo kurya, afite vitamini C nyinshi' },
        { name: 'Imbuto z\'ibirayi', price: '2,500 RWF/kg', description: 'Ibirayi byiza byo kurya, byuzuye carbohydrate' },
        { name: 'Imbuto z\'igikoma', price: '3,200 RWF/kg', description: 'Igikoma cyiza cyo kurya, cyuzuye vitamini' },
        { name: 'Imbuto z\'amashu', price: '4,800 RWF/kg', description: 'Amashu meza yo kurya, afite calcium nyinshi' },
        { name: 'Imbuto z\'ubwoba', price: '6,500 RWF/kg', description: 'Ubwoba bwiza bwo kurya, bufite vitamini A nyinshi' },
        { name: 'Imbuto z\'ubwigimbe', price: '7,200 RWF/kg', description: 'Ubwigimbe bwiza bwo kurya, burangirana indwara' },
        { name: 'Imbuto z\'amacunga', price: '3,800 RWF/kg', description: 'Amacunga meza yo kurya, arangirana amaraso' },
        { name: 'Imbuto z\'umugati', price: '5,500 RWF/kg', description: 'Umugati mwiza wo kurya, wuzuye antioxidants' },
        { name: 'Imbuto z\'isugura', price: '4,200 RWF/kg', description: 'Isugura yiza yo kurya, itanga ubwoba bwiza' }
      ]
    },
    'ibiribwa_byumye': {
      name: 'Ibiribwa Byumye (Harvested/Ready Foods)',
      items: [
        { name: 'Umuceri', price: '1,200 RWF/kg', description: 'Umuceri mwiza wumye wo kurya, w\'ireme rya mbere' },
        { name: 'Ibigori', price: '800 RWF/kg', description: 'Ibigori byiza byumye byo kurya, birangirana ubwoba' },
        { name: 'Ubunyebuye', price: '600 RWF/kg', description: 'Ubunyebuye bwiza bwumye bwo kurya, bunezeza' },
        { name: 'Ibinyebwa', price: '1,400 RWF/kg', description: 'Ibinyebwa byiza byumye byo kurya, bifite vitamini B' },
        { name: 'Ibishyimbo', price: '900 RWF/kg', description: 'Ibishyimbo byiza byumye byo kurya, bifite proteine' },
        { name: 'Amaru', price: '1,800 RWF/kg', description: 'Amaru meza yumye yo kurya, afite amavuta meza' },
        { name: 'Ibirayi', price: '400 RWF/kg', description: 'Ibirayi byiza byo kurya, byoroshye guteka' },
        { name: 'Ibikombe', price: '350 RWF/kg', description: 'Ibikombe byiza byo kurya, birangirana amaraso' }
      ]
    },
    'imboga_za_kijyambere': {
      name: 'Imboga za Kijyambere (Fresh Vegetables)',
      items: [
        { name: 'Amanyanya', price: '800 RWF/kg', description: 'Amanyanya meza yo kurya, afite lycopene' },
        { name: 'Igikoma', price: '500 RWF/kg', description: 'Igikoma cyiza cyo kurya, gitanga fibre nyinshi' },
        { name: 'Amashu', price: '600 RWF/kg', description: 'Amashu meza yo kurya, atanga calcium' },
        { name: 'Ubwoba', price: '700 RWF/kg', description: 'Ubwoba bwiza bwo kurya, butanga beta-carotene' },
        { name: 'Amacunga', price: '400 RWF/kg', description: 'Amacunga meza yo kurya, arangirana amaraso' },
        { name: 'Isugura', price: '300 RWF/kg', description: 'Isugura yiza yo kurya, itanga ubwoba munini' },
        { name: 'Amaboga', price: '250 RWF/ikintu', description: 'Amaboga meza yo kurya, atanga vitamini K' },
        { name: 'Inyama y\'amaboga', price: '450 RWF/kg', description: 'Inyama y\'amaboga yo kurya, itanga proteine' }
      ]
    },
    'imbuto_z_imbere': {
      name: 'Imbuto z\'Imbere (Fruits)',
      items: [
        { name: 'Papayi', price: '2,800 RWF/kg', description: 'Papayi nziza yo kurya, ifite vitamini C nyinshi' },
        { name: 'Inananasi', price: '3,500 RWF/kg', description: 'Inananasi nziza yo kurya, ifite bromelain' },
        { name: 'Amagi', price: '200 RWF/rimwe', description: 'Amagi meza yo kurya, afite proteine nziza' },
        { name: 'Amata', price: '600 RWF/litiro', description: 'Amata meza yo kunywa, afite calcium nyinshi' },
        { name: 'Banana', price: '150 RWF/ikigabane', description: 'Banana nziza yo kurya, ifite potassium' },
        { name: 'Avoka', price: '1,200 RWF/kg', description: 'Avoka nziza yo kurya, ifite amavuta meza' },
        { name: 'Ibinyomoro', price: '2,200 RWF/kg', description: 'Ibinyomoro byiza byo kurya, bifite vitamini C' },
        { name: 'Umubibo', price: '800 RWF/kg', description: 'Umubibo mwiza wo kunywa, ufite antioxidants' }
      ]
    },
    'ifumbire_n_imiti': {
      name: 'Ifumbire n\'Imiti (Fertilizers & Pesticides)',
      items: [
        { name: 'Ifumbire y\'inka (NPK 17-17-17)', price: '45,000 RWF/igunia', description: '50kg - ifumbire y\'ibanze y\'ubuhinzi, itera ibimera vuba' },
        { name: 'Ifumbire rusangiza (DAP)', price: '35,000 RWF/igunia', description: '50kg - ifumbire rusange y\'ubuhinzi, itanga phosphorus' },
        { name: 'Ifumbire y\'imbuto (TSP)', price: '25,000 RWF/igunia', description: '25kg - ifumbire y\'imbuto, itera imizi nziza' },
        { name: 'Ifumbire kamere (Compost)', price: '18,000 RWF/igunia', description: '50kg - ifumbire kamere y\'inyamaswa, itera ubutaka' },
        { name: 'Imiti y\'udukoko (Insecticide)', price: '8,500 RWF/icupa', description: 'Imiti yo kurwanya udukoko, 1L icupa' },
        { name: 'Imiti y\'indwara (Fungicide)', price: '12,000 RWF/icupa', description: 'Imiti yo kurwanya indwara z\'ibimera, 1L' },
        { name: 'Imiti y\'ibyatsi (Herbicide)', price: '6,800 RWF/icupa', description: 'Imiti yo kurwanya ibyatsi bibi, 1L icupa' }
      ]
    },
    'ibikoresho_by_ubuhinzi': {
      name: 'Ibikoresho by\'Ubuhinzi (Farming Tools)',
      items: [
        { name: 'Isuka', price: '8,500 RWF', description: 'Isuka y\'ubuhinzi yo guhinga, ikozwe mu cyuma gikomeye' },
        { name: 'Icyuma', price: '12,000 RWF', description: 'Icyuma cyo guhinga n\'gutema, gikozwe neza' },
        { name: 'Urushinge', price: '25,000 RWF', description: 'Urushinge rw\'ubuhinzi, rwihangana imvura' },
        { name: 'Agasanduku k\'imbuto', price: '5,500 RWF', description: 'Agasanduku gato k\'imbuto, gasiba neza' },
        { name: 'Ikibindi', price: '18,500 RWF', description: 'Ikibindi cyo gusarura, gikora neza' },
        { name: 'Umuhoro', price: '22,000 RWF', description: 'Umuhoro wo guhinga ubwoba, ukozwe mu cyuma' },
        { name: 'Imiyoboro y\'amazi', price: '15,000 RWF/100m', description: 'Imiyoboro yo kuhira ibimera, ihangana imyaka myinshi' },
        { name: 'Udushinge tw\'amababi', price: '3,200 RWF/10 ibice', description: 'Udushinge two gufata amababi, tw\'ubwoba bwiza' }
      ]
    },
    'ibicuruzwa_by_inganda': {
      name: 'Ibicuruzwa by\'Inganda z\'Ibiribwa (Processed Food Products)',
      items: [
        { name: 'Ifu y\'ibigori', price: '1,800 RWF/kg', description: 'Ifu y\'ibigori yo gukora ubugali n\'amakeke' },
        { name: 'Ifu y\'umuceri', price: '2,200 RWF/kg', description: 'Ifu y\'umuceri yo gukora ibinyama n\'ubugali' },
        { name: 'Amavuta y\'ibinyampeke', price: '3,500 RWF/litiro', description: 'Amavuta meza yo guteka, atunguranye neza' },
        { name: 'Ubuki bwatunguranye', price: '15,000 RWF/kg', description: 'Ubuki bwiza bwatunguranye, buzira ubwoba' },
        { name: 'Amata y\'ifuka', price: '8,500 RWF/kg', description: 'Amata y\'ifuka yo kurya, afite calcium nyinshi' },
        { name: 'Inyama yakomeje', price: '12,000 RWF/kg', description: 'Inyama yakomeje yo kubika, itunguranye neza' },
        { name: 'Amagi yakomeje', price: '4,500 RWF/kg', description: 'Amagi yakomeje yo kubika, atunguranye neza' }
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setApiKey('AIzaSyBkIAgT8SBMwpitI-rOM-jrBLnCn2KTxf8');
  }, [messages]);

  // Initialize with welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([{
          id: 1,
          text: 'Muraho! Ndagufasha kubaza ibyerekeye ubuhinzi, ibiribwa, imboga, imbuto n\'ibicuruzwa byose byacu. Ubaza ikibazo cyose cyerekeye ubuhinzi!',
          sender: 'ai',
          timestamp: new Date()
        }]);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Enhanced language detection
  const detectLanguage = (text) => {
    const kinyarwandaWords = [
      'muraho', 'bite', 'amakuru', 'ibicuruzwa', 'amafaranga', 'giciro', 'intama', 'inka', 'imbuto', 'ifumbire', 
      'ubuhinzi', 'mfasha', 'ndashaka', 'icyondi', 'ese', 'ariko', 'kandi', 'cyangwa', 'ibiribwa', 'imboga',
      'amanyanya', 'ibirayi', 'umuceri', 'ibigori', 'ibishyimbo', 'amaru', 'ubuki', 'amata', 'amagi', 'inyama',
      'inkoko', 'ihene', 'papayi', 'banana', 'avoka', 'isugura', 'amacunga', 'igikoma', 'ubwoba', 'ningahe',
      'byinshi', 'nkeho', 'nkunda', 'nawe', 'nanjye', 'twese', 'bamwe', 'benshi', 'bose', 'byose'
    ];
    
    const englishWords = [
      'hello', 'hi', 'how', 'what', 'price', 'cost', 'help', 'products', 'animals', 'seeds', 'fertilizer', 
      'farming', 'agriculture', 'food', 'vegetables', 'fruits', 'grains', 'beans', 'tomatoes', 'potatoes',
      'rice', 'maize', 'wheat', 'honey', 'milk', 'eggs', 'meat', 'chicken', 'goat', 'cattle', 'sheep',
      'much', 'many', 'like', 'want', 'need', 'buy', 'sell', 'good', 'best', 'quality'
    ];
    
    const textLower = text.toLowerCase();
    
    let kinyarwandaCount = 0;
    let englishCount = 0;
    
    kinyarwandaWords.forEach(word => {
      if (textLower.includes(word)) kinyarwandaCount++;
    });
    
    englishWords.forEach(word => {
      if (textLower.includes(word)) englishCount++;
    });
    
    return kinyarwandaCount >= englishCount ? 'kinyarwanda' : 'english';
  };

  // Create comprehensive system prompt
  const createSystemPrompt = (language) => {
    const productDetails = Object.values(products).map(category => 
      `\n**${category.name}:**\n` + 
      category.items.map(item => `• ${item.name}: ${item.price} - ${item.description}`).join('\n')
    ).join('\n');

    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const prompts = {
      kinyarwanda: `Uri umufasha w'AI w'ubucuruzi bw'ubuhinzi n'ibiribwa mu Rwanda. Uzi byose ku bijyanye n'ubuhinzi, imbuto, ibinyabuzima, ifumbire, ibikoresho, n'ibiribwa byose.

AMABWIRIZA AKURIKIRA:
1. SUBIZA MU KINYARWANDA GUSA
2. Suzuza neza ikibazo mbere yo gusubiza
3. Koresha amakuru menshi kuri buri gicuruzwa
4. Tanga ibiciro byukuri n'ibisobanuro birambuye
5. Saba ibibazo birenze igibazo cyo hambere niba bikenewe
6. Koresha **ijambo** kugirango urandike ijambo ryose ry'ingenzi
7. Tanga inama z'ubuhinzi n'ubworozi
8. Sobanura neza ko ibicuruzwa byose bifite akamaro gake mu buzima
9. Niba umukiriya abaza ibyerekeye ubwiyongere bw'ubuhinzi, muhe inama nziza
10. Niba utabasha gusubiza neza, saba impushya z'ikibazo

IBICURUZWA BYOSE BIFITE AMAKURU YUZUYE:
${productDetails}

AMAKURU Y'UBUHINZI:
- Igihe cy'ihinga: Mata-Nyakanga (Umwaka wa mbere), Nzeri-Ukwakira (Umwaka wa kabiri)
- Igihe cy'umusaruro: Nzeri-Ukwakira (Umwaka wa mbere), Mutarama-Werurwe (Umwaka wa kabiri)
- Ifumbire y'ingenzi: NPK 17-17-17 (ifumbire rusange), DAP (ifumbire y'imbuto), Urea (ifumbire y'nitrogen)
- Amazi: Ibimera byose bikeneye amazi menu 2-3 buri cyumweru
- Ubutaka: Ubutaka buzira amaziko (pH 6.0-7.0) ni bwiza ku bimera byinshi

Ubushakashatsi bw'iri taliki: ${currentDate}

Kora nk'umucuruzi w'ubuhinzi ukunda abakiriya kandi ufasha cyane!`,

      english: `You are an AI assistant for agricultural and food business in Rwanda. You know everything about farming, seeds, livestock, fertilizers, tools, and all food products.

FOLLOW THESE INSTRUCTIONS:
1. RESPOND IN ENGLISH ONLY
2. Analyze the question carefully before responding
3. Use detailed information about each product
4. Provide accurate prices and comprehensive descriptions
5. Ask follow-up questions if needed to better help
6. Use **word** to highlight important terms
7. Give farming and livestock advice
8. Explain clearly how all products benefit health and farming
9. If customer asks about farming techniques, provide expert advice
10. If you cannot answer precisely, ask for clarification

ALL PRODUCTS WITH COMPLETE INFORMATION:
${productDetails}

FARMING INFORMATION:
- Planting seasons: March-July (Season A), September-December (Season B)
- Harvest seasons: September-December (Season A), January-March (Season B)
- Key fertilizers: NPK 17-17-17 (balanced fertilizer), DAP (starter fertilizer), Urea (nitrogen fertilizer)
- Watering: Most crops need regular watering 2-3 times per week
- Soil: Well-drained soil (pH 6.0-7.0) is ideal for most crops

Today's date: ${currentDate}

Act as a friendly and very helpful agricultural business representative!`
    };

    return prompts[language] || prompts.kinyarwanda;
  };

  // Format response text
  const formatResponseText = (text) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/^[•\-*]\s+(.+)$/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, (match) => {
      return '<ul>' + match + '</ul>';
    });
    formattedText = formattedText.replace(/\n\n/g, '<br><br>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    return formattedText;
  };

  // Call Gemini API
  const callGeminiAPI = async (userMessage) => {
    if (!apiKey.trim()) {
      throw new Error('API key required');
    }

    try {
      const detectedLanguage = detectLanguage(userMessage);
      const systemPrompt = createSystemPrompt(detectedLanguage);
      
      const promptText = `${systemPrompt}\n\n${detectedLanguage === 'kinyarwanda' ? 'Ububazo bw\'umukiriya:' : 'Customer question:'} ${userMessage}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: promptText
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 2048,
            candidateCount: 1
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const rawText = data.candidates[0].content.parts[0].text;
        return formatResponseText(rawText);
      } else {
        throw new Error('No valid response from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  // Fallback response when API is not available
  const getFallbackResponse = (userMessage) => {
    const detectedLanguage = detectLanguage(userMessage);
    
    if (detectedLanguage === 'kinyarwanda') {
      return `<strong>Mbabarira!</strong> Nkeneye API key ya Gemini kugirango nkoreshe AI. Nyabuna kanda "⚙️" kugirango washyire API key yawe.<br><br>
      <strong>Ariko nashobora gukubwira ko dufite ibicuruzwa byinshi by'ubuhinzi:</strong><br>
      • Ibinyabuzima (Intama, Inka, Inkoko)<br>
      • Imbuto zinyuranye (Umuceri, Ibigori, Ibishyimbo)<br>
      • Imboga za kijyambere (Amanyanya, Ibirayi)<br>
      • Ifumbire n'imiti y'ubuhinzi<br><br>
      Ni iki gikomeye wifuza kumenya ku bicuruzwa byacu?`;
    } else {
      return `<strong>Sorry!</strong> I need a Gemini API key to use AI responses. Please click "⚙️" to enter your API key.<br><br>
      <strong>However, I can tell you we have many agricultural products:</strong><br>
      • Livestock (Sheep, Cattle, Chickens)<br>
      • Various Seeds (Rice, Maize, Beans)<br>
      • Fresh Vegetables (Tomatoes, Potatoes)<br>
      • Fertilizers and farming pesticides<br><br>
      What would you like to know about our products?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponseText;
      
      if (apiKey.trim()) {
        aiResponseText = await callGeminiAPI(currentInput);
      } else {
        aiResponseText = getFallbackResponse(currentInput);
      }

      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 800);

    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: getFallbackResponse(currentInput),
        sender: 'ai',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorResponse]);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
          aria-label="Open chat"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12H16M8 16H13M21 12C21 16.418 16.418 21 12 21C10.8748 21 9.80916 20.7736 8.84398 20.3626L3 22L4.63742 16.156C4.22643 15.1908 4 14.1252 4 13C4 8.582 8.582 4 13 4C17.418 4 21 8.582 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {!isOpen && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
            AI
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border border-green-200 z-40 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Ubufatanye bw&apos;AI - Gemini</h3>
              <p className="text-sm opacity-90">Ubuhinzi n&apos;Ibiribwa</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">Online</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg animate-in fade-in-0 slide-in-from-bottom-1 duration-300 ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white ml-8'
                    : 'bg-green-100 text-green-800 mr-8'
                }`}
              >
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }}></p>
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-green-100 text-green-800 mr-8 p-3 rounded-lg animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-sm">AI irimo gusubiza...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-green-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Baza ibyerekeye ubuhinzi n'ibiribwa..."
                className="flex-1 border border-green-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                disabled={!inputValue.trim() || isLoading}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;