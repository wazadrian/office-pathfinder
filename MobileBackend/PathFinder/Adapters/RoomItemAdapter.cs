using System.Collections.Generic;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Java.Lang;
using MobileBackend.Models;

namespace PathFinder.Adapters
{
    internal class RoomItemAdapter : BaseAdapter
    {
        private readonly Context context;
        private readonly List<Room> rooms;

        public RoomItemAdapter(Context context, List<Room> rooms)
        {
            this.context = context;
            this.rooms = rooms;
        }
        
        public override int Count => rooms.Count;

        public override Object GetItem(int position)
        {
            return null;
        }

        public override long GetItemId(int position)
        {
            return rooms[position].employeeId;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            var view = convertView;
            var inflater = context.GetSystemService(Context.LayoutInflaterService).JavaCast<LayoutInflater>();

            view = inflater.Inflate(Resource.Layout.listItemLayout, parent, false);
            var Title = view.FindViewById<TextView>(Resource.Id.Title);
            var TitleCd = view.FindViewById<TextView>(Resource.Id.TitleCd);

            Title.Text = rooms[position].roomName;
            TitleCd.Text = rooms[position].roomNumber.ToString();

            return view;
        }
    }

    internal class RoomItemAdapterViewHolder : Object
    {
        //Your adapter views to re-use
        public TextView Title { get; set; }
        public TextView TitleCd { get; set; }
    }
}