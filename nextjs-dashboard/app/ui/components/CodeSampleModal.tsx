export default function CodeSampleModal({
    isOpen,
    closeModal
}: {
    isOpen: boolean;
    closeModal: () => void;
}) {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold">Código de Ejemplo</h2>
                <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    );
}