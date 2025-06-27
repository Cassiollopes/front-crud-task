import ErrorTemplate from "@/components/ui/errorTemplate";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ErrorTemplate
        error="Página não encontrada"
        description="Desculpe, a página que você está procurando não existe."
        ButtonLabel="Voltar para página inicial"
        callbackUrl="/"
      />
    </div>
  );
}
