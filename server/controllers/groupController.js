import Group from '../models/groupModel.js';



export const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const admin = req.user;
    console.log(name)
    if (!name) {
        return res.status(400).json({ message: 'Group name is required' });
      }

    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: 'Group name already exists' });
    }

    const newGroup = new Group({
      name,
      description,
      members:[admin],
      admin: [admin], 
    });

    await newGroup.save();

    res.status(201).json({
      group: newGroup,
      message: 'Group created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during group creation' });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId; 
    const user = req.user; 

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.members.includes(user._id)) {

      return res.status(400).json({ message: 'User is already a member of this group' });
    }

    group.members.push(user);

    await group.save();

    res.status(200).json({ message: 'User joined the group successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while joining the group' });
  }
};

export const addMemberToGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId; 
    const memberId = req.body.memberId; 

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.members.includes(memberId)) {
      return res.status(400).json({ message: 'Member is already part of this group' });
    }

    group.members.push(memberId);
    await group.save();

    res.status(200).json({ message: 'Member added to the group successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding the member to the group' });
  }
};


export const getUserGroups = async (req, res) => {
    try {
      const userId = req.user._id;
      const userGroups = await Group.find({ members: userId });
      const filteredUserGroups = userGroups.map((group) => ({
        id : group._id,
        name: group.name,
        description: group.description,
        creationDate: group.creationDate,
      }));
  
      res.status(200).json({ userGroups: filteredUserGroups });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching user groups' });
    }
  };

  export const searchGroups = async (req, res) => {
    try {
      const searchQuery = req.query.q; // Get the search query from the request query parameters
  
      if (!searchQuery) {
        return res.status(400).json({ message: 'Search query is required' });
      }
  
      // Use a regular expression to perform a case-insensitive search for groups
      const groups = await Group.find({
        name: { $regex: searchQuery, $options: 'i' }, // 'i' flag for case-insensitive search
      });
  
      res.status(200).json({ groups });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while searching for groups' });
    }
  };