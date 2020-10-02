import dbConnect from '../../utils/DbConnect'

dbConnect();

export default async (req, res) => {

  res.status(200);
  res.json({ name: 'John Doe' })
}
