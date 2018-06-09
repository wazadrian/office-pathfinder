namespace WindowsFormsApp1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.buttonEmployee = new System.Windows.Forms.Button();
            this.textBoxEmployee = new System.Windows.Forms.TextBox();
            this.listBoxEmployees = new System.Windows.Forms.ListBox();
            this.textBoxOffice = new System.Windows.Forms.TextBox();
            this.buttonOffice = new System.Windows.Forms.Button();
            this.buttonRoom = new System.Windows.Forms.Button();
            this.textBoxRoom = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // buttonEmployee
            // 
            this.buttonEmployee.Location = new System.Drawing.Point(12, 38);
            this.buttonEmployee.Name = "buttonEmployee";
            this.buttonEmployee.Size = new System.Drawing.Size(120, 23);
            this.buttonEmployee.TabIndex = 0;
            this.buttonEmployee.Text = "Szukaj pracowika";
            this.buttonEmployee.UseVisualStyleBackColor = true;
            this.buttonEmployee.Click += new System.EventHandler(this.buttonEmployee_Click);
            // 
            // textBoxEmployee
            // 
            this.textBoxEmployee.Location = new System.Drawing.Point(12, 12);
            this.textBoxEmployee.Name = "textBoxEmployee";
            this.textBoxEmployee.Size = new System.Drawing.Size(120, 20);
            this.textBoxEmployee.TabIndex = 1;
            // 
            // listBoxEmployees
            // 
            this.listBoxEmployees.FormattingEnabled = true;
            this.listBoxEmployees.Location = new System.Drawing.Point(138, 12);
            this.listBoxEmployees.Name = "listBoxEmployees";
            this.listBoxEmployees.Size = new System.Drawing.Size(250, 290);
            this.listBoxEmployees.TabIndex = 2;
            this.listBoxEmployees.MouseClick += new System.Windows.Forms.MouseEventHandler(this.listBoxEmployees_MouseClick);
            // 
            // textBoxOffice
            // 
            this.textBoxOffice.Location = new System.Drawing.Point(12, 119);
            this.textBoxOffice.Name = "textBoxOffice";
            this.textBoxOffice.Size = new System.Drawing.Size(120, 20);
            this.textBoxOffice.TabIndex = 3;
            // 
            // buttonOffice
            // 
            this.buttonOffice.Location = new System.Drawing.Point(12, 145);
            this.buttonOffice.Name = "buttonOffice";
            this.buttonOffice.Size = new System.Drawing.Size(120, 23);
            this.buttonOffice.TabIndex = 4;
            this.buttonOffice.Text = "Szukaj biura";
            this.buttonOffice.UseVisualStyleBackColor = true;
            this.buttonOffice.Click += new System.EventHandler(this.buttonOffice_Click);
            // 
            // buttonRoom
            // 
            this.buttonRoom.Location = new System.Drawing.Point(12, 278);
            this.buttonRoom.Name = "buttonRoom";
            this.buttonRoom.Size = new System.Drawing.Size(120, 23);
            this.buttonRoom.TabIndex = 6;
            this.buttonRoom.Text = "Szukaj pokoju";
            this.buttonRoom.UseVisualStyleBackColor = true;
            this.buttonRoom.Click += new System.EventHandler(this.buttonRoom_Click);
            // 
            // textBoxRoom
            // 
            this.textBoxRoom.Location = new System.Drawing.Point(12, 252);
            this.textBoxRoom.Name = "textBoxRoom";
            this.textBoxRoom.Size = new System.Drawing.Size(120, 20);
            this.textBoxRoom.TabIndex = 5;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(400, 313);
            this.Controls.Add(this.buttonRoom);
            this.Controls.Add(this.textBoxRoom);
            this.Controls.Add(this.buttonOffice);
            this.Controls.Add(this.textBoxOffice);
            this.Controls.Add(this.listBoxEmployees);
            this.Controls.Add(this.textBoxEmployee);
            this.Controls.Add(this.buttonEmployee);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonEmployee;
        private System.Windows.Forms.TextBox textBoxEmployee;
        private System.Windows.Forms.ListBox listBoxEmployees;
        private System.Windows.Forms.TextBox textBoxOffice;
        private System.Windows.Forms.Button buttonOffice;
        private System.Windows.Forms.Button buttonRoom;
        private System.Windows.Forms.TextBox textBoxRoom;
    }
}

