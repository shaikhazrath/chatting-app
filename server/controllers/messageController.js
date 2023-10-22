import Message from '../models/messageModel.js'; 

export const groupMessages = async (req, res) => {
    try {
      const groupId = req.params.groupId;
      const perPage = parseInt(req.query.perPage) || 20; 
  
  
      const messages = await Message.find({ group: groupId })
        .sort({ creationDate: -1 }) 
        .limit(perPage)
        .populate('sender'); 
  
      res.json({ messages });
    } catch (error) {
      console.error('Error fetching group messages:', error);
      res.status(500).json({ error: 'Failed to fetch group messages' });
    }
  };

  
  
  
  