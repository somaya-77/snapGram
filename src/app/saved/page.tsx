import Image from 'next/image';
import AuthLayout from '@/components/AuthLayout';
import { ContentSaved } from '@/components/shared';

const Saved = () => {
  return (
    <AuthLayout
    >
      <div className="saved-container">
        <div className="flex gap-2 w-full max-w-5xl">
          <Image
            src="/assets/icons/save.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
        <ContentSaved />
      </div>
    </AuthLayout>
  )
}

export default Saved;



