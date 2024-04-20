const router = express.Router();

const { getCollection, ObjectId } = require('../todo-api')

// GET /api/todos
router.get('/api/todos', async (_, response) => {
    const collection = await getCollection()
    const todos = await collection.find().toArray()
	response.json(todos);
})

// POST /api/todos
router.post('/api/todos', async (request, response) => {
	const { item, complete } = request.body
    const collection = await getCollection()
    const result = await collection.insertOne({ item, complete })
    response.json(result.ops[0]);

})

// PUT /api/todos/:id
router.put('/api/todos/:id', async (request, response) => {
    const { id } = request.params;
    const collection = await getCollection();
    const objectId = new ObjectId(id);

    const todo = await collection.findOne({ _id: new ObjectId(id) });
    const complete = !todo.complete;
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } });
    response.json({ id, complete });
});

module.exports = router;