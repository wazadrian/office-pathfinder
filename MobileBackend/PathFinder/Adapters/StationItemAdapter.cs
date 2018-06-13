using System.Collections.Generic;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Java.Lang;
using MobileBackend.Models;

namespace PathFinder.Adapters
{
    internal class StationItemAdapter : BaseAdapter
    {
        private readonly Context context;
        private readonly List<Station> _stations;

        public StationItemAdapter(Context context, List<Station> stations)
        {
            this.context = context;
            this._stations = stations;
        }
        
        public override int Count => _stations.Count;

        public override Object GetItem(int position)
        {
            return null;
        }

        public override long GetItemId(int position)
        {
            return _stations[position].employeeId;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            var view = convertView;
            var inflater = context.GetSystemService(Context.LayoutInflaterService).JavaCast<LayoutInflater>();

            view = inflater.Inflate(Resource.Layout.listItemLayout, parent, false);
            var Title = view.FindViewById<TextView>(Resource.Id.Title);
            var TitleCd = view.FindViewById<TextView>(Resource.Id.TitleCd);

            Title.Text = _stations[position].stationName;
            //TitleCd.Text = _stations[position].;

            return view;
        }
    }

    internal class StationItemAdapterViewHolder : Object
    {
        //Your adapter views to re-use
        public TextView Title { get; set; }
        public TextView TitleCd { get; set; }
    }
}