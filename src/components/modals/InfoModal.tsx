import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the equation equal to 69 in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the equation.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="9" status="correct" />
        <Cell value="+" />
        <Cell value="1" />
        <Cell value="0" />
        <Cell value="*" />
		<Cell value="6" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The digit 9 is in the equation and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="3" />
        <Cell value="6" />
        <Cell value="*" status="present" />
        <Cell value="2" />
        <Cell value="-" />
		<Cell value="3" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The operator * is in the equation but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="1" />
        <Cell value="5" />
        <Cell value="*" />
        <Cell value="5" status="absent" />
        <Cell value="-" />
		<Cell value="6" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The digit 5 is not in the equation in any spot.
      </p>
    </BaseModal>
  )
}
