import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface Iprops {
  isOpen: boolean
  closeModal: () => void
  title?: string
  children: ReactNode 
  description?: string;

}

const Modal = ({ isOpen, closeModal, title, children , description }: Iprops) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title className=" font-medium leading-6 text-gray-900  text-center fw-bolder  text-2xl">
                    {title}
                  </Dialog.Title>
                )}
                      {description && <p className="text-sm text-gray-500 mt-3">{description}</p>}
                <div className="mt-4">
                  {children}
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

      </Dialog>
    </Transition>
  )
}

export default Modal
