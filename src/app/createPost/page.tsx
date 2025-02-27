import Image from 'next/image';
import AuthLayout from '@/src/components/AuthLayout';
import PostForm from '@/src/components/forms/PostForm';

const CreatePost = () => {
  return (
    <AuthLayout>
      <div className="flex flex-1 w-full">
        <section className='common-container w-full'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
                <Image src='/assets/icons/add-post.svg' alt='add' width={36}
                    height={36} />

                <h2 className='h3-bold md:h2-bold text-left w-full'>Create post</h2>
            </div>
          <PostForm />
        </section>
      </div>
    </AuthLayout>
  )
}

export default CreatePost;
