export default function Loading() {
  return (
    <section
      style={{
        maxWidth: 'calc(100vw - ((100vw - 1180px)/ 2))'
      }}
      className={`flex gap-12 ml-auto w-full min-h-[656px]`}
    >
      <article className="flex flex-col w-full gap-4 max-w-[1180px] min-h-[41rem] mx-auto animate-pulse">
        <div className="flex w-full h-[37.5rem] bg-gray-500 rounded-lg" />
        <div className="flex justify-between items-end mt-auto w-ful">
          <div className='flex w-2/5 h-10 bg-gray-500 rounded-lg' />
          <div className='flex w-1/12 h-10 bg-gray-500 rounded-lg' />
        </div>
      </article>
      <article className="flex flex-col w-full gap-4 max-w-[1180px] min-h-[41rem] mx-auto animate-pulse">
        <div className="flex w-full h-[37.5rem] bg-gray-500 rounded-lg" />
        <div className="flex justify-between items-end mt-auto w-ful">
          <div className='flex w-2/5 h-10 bg-gray-500 rounded-lg' />
          <div className='flex w-1/12 h-10 bg-gray-500 rounded-lg' />
        </div>
      </article>
    </section>
  )
}