import Chat from '../models/chatModel.js'

export const getGroup = async (req, res) => {
    try {
        const participantId = req.query.id;
        const groups = await Chat.find({ participants: participantId });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, participants } = req.body;

        const newGroup = new Chat({
            groupName,
            groupDescription,
            participants,
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const addParticipants = async (req, res) => {
    try {
        const { groupId, participants } = req.body;

        const group = await Chat.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        group.participants = [...group.participants, ...participants];

        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const removeParticipants = async (req, res) => {
    try {
        const { groupId, participants } = req.body;

        const group = await Chat.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        group.participants = group.participants.filter(
            (participant) => !participants.includes(participant.toString())
        );

        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error });
    }
};