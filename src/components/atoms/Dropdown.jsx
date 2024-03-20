import Link from 'next/link'

export default function Dropdown({ data, handler }) {
  console.log(data)
  return (
    <div className='absolute right-0'>
      <div className='triangle z-10'></div>
      <ul className="shadow-[0_0_4px_0px_rgba(0,0,0)] relative top-4 -right-2 px-3 bg-white py-1">
        {data.map((d, i) => (
          <li key={i}>
            <Link onClick={() => handler() || null} href={d?.url} className='hover:text-blue-500'>
              {d?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
