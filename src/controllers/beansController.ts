import { Request, Response } from 'express';
import Bean from '../models/coffeeBean';

/**
 * Get all coffee beans
 * @route GET /beans
 */
export const getBeans = async (req: Request, res: Response) => {
  try {
    const beans = await Bean.find();
    res.json(beans);
  } catch (error) {
    console.error('Error fetching beans:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Add a new coffee bean
 * @route POST /beans
 */
export const addBean = async (req: Request, res: Response) => {
  try {
    const { name, rating, description } = req.body;

    // Create new bean instance
    const newBean = new Bean({
      name,
      rating,
      description,
    });

    // Save to database
    const savedBean = await newBean.save();

    res.status(201).json(savedBean);
  } catch (error) {
    console.error('Error adding bean:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Remove a coffee bean
 * @route DELETE /beans/:id
 */
export const deleteBean = async (req: Request, res: Response) => {
  try {
    const bean = await Bean.findById(req.params.id);

    if (!bean) {
      res.status(404).json({ message: 'Bean not found' });
      return;
    }

    await Bean.findByIdAndDelete(req.params.id);

    res.json({ message: 'Bean removed' });
  } catch (error: unknown) {
    console.error('Error deleting bean:', error);

    res.status(500).json({ message: 'Server error' });
    return;
  }
};
